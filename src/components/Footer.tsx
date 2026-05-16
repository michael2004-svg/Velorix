"use client";

import Link from "next/link";
import { Zap, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  Platform: ["Browse Jobs", "How It Works", "Velorix Academy", "Community"],
  Company: ["About Us", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact", "Privacy Policy", "Terms of Service"],
  Categories: ["Mathematics", "Coding", "Cybersecurity", "Healthcare", "Legal"],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Zap size={16} className="text-white fill-white" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                Velorix <span className="gradient-text-violet">AI</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
              The world's leading platform for AI training contributors. Flexible,
              fair, and impactful.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium text-white text-xs mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-gray-600 text-xs hover:text-gray-300 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-700 text-xs">
            © 2025 Velorix AI. All rights reserved. Powering the future of AI training.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-xs">Payments secured by</span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/4 border border-white/8">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-blue-400 text-xs font-medium">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}