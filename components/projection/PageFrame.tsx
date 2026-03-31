import Link from "next/link";
import type { ReactNode } from "react";

type PageFrameProps = {
  children: ReactNode;
  eyebrow?: string;
  description?: string;
};

export function PageFrame({
  children,
  eyebrow = "DIAGNOSTIC PREMIUM",
  description = "Une lecture claire pour structurer votre activité.",
}: PageFrameProps) {
  return (
    <div className="premium-shell">
      <header className="mb-10 flex items-start justify-between gap-6">
        <Link
          href="/"
          className="inline-flex flex-col items-center text-center leading-none"
        >
          <span
            className="text-[2.8rem] tracking-[-0.06em] text-ink md:text-[3.35rem]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            AC
          </span>
          <span className="mt-1 text-[0.95rem] text-ink">arnaudcrestey.com</span>
        </Link>

        <div className="pt-1 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3d5fd6]">
            {eyebrow}
          </p>
          <p className="mt-2 text-sm text-slateSoft">{description}</p>
        </div>
      </header>

      {children}
    </div>
  );
}
