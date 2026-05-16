import { NextRequest, NextResponse } from "next/server";

const PAYPAL_CLIENT_ID = "AQ1vLE7ijyV2OAKGtkEdqe68eP25KIgTEAoZZnhfvw0L1mgnI0AdMd6YhS35JfLSh9RejcY_q2_JtOmu";
const PAYPAL_SECRET = "EHSUujyNTSr8ZMWZpP9_vNbz45j3r0qdLVDQf_Fd00ad_1oe9PxLlJQyGl7-KFpqx3uvaHUvfULvMX2j";
const PAYPAL_BASE = "https://api-m.sandbox.paypal.com"; // Switch to live for production

async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
  const response = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { amount, description, courseId } = await req.json();
    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: courseId,
            description,
            amount: {
              currency_code: "USD",
              value: amount.toFixed(2),
            },
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/academy?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/academy?cancelled=true`,
        },
      }),
    });

    const order = await response.json();
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}