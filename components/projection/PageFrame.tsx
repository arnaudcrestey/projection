import Link from "next/link";
import type { ReactNode } from "react";

type PageFrameProps = {
  children: ReactNode;
  eyebrow?: string;
};

export function PageFrame({
  children,
  eyebrow = "PROJECTION",
}: PageFrameProps) {
  return (
    <div className="premium-shell">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
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
            <span className="mt-1 text-[0.95rem] text-ink">
              arnaudcrestey.com
            </span>
          </Link>
        </div>

        <div className="pt-1 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slateSoft">
            {eyebrow}
          </p>
          <p className="mt-2 text-sm text-slateSoft">
            Un point d&apos;entrée clair pour structurer votre activité.
          </p>
        </div>
      </header>

      {children}
    </div>
  );
}
