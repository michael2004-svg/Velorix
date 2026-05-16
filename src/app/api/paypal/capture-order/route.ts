import { NextRequest, NextResponse } from "next/server";

const PAYPAL_CLIENT_ID = "AQ1vLE7ijyV2OAKGtkEdqe68eP25KIgTEAoZZnhfvw0L1mgnI0AdMd6YhS35JfLSh9RejcY_q2_JtOmu";
const PAYPAL_SECRET = "EHSUujyNTSr8ZMWZpP9_vNbz45j3r0qdLVDQf_Fd00ad_1oe9PxLlJQyGl7-KFpqx3uvaHUvfULvMX2j";
const PAYPAL_BASE = "https://api-m.sandbox.paypal.com";

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
    const { orderId } = await req.json();
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const capture = await response.json();
    return NextResponse.json(capture);
  } catch (error) {
    return NextResponse.json({ error: "Failed to capture order" }, { status: 500 });
  }
}