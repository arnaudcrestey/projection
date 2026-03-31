import Link from "next/link";
import type { ReactNode } from "react";

type PageFrameProps = {
  children: ReactNode;
};

export function PageFrame({ children }: PageFrameProps) {
  return (
    <div className="premium-shell">
      <header className="mb-10 flex w-full items-start justify-between gap-6">
        <Link href="/" className="inline-flex shrink-0 flex-col items-start leading-none">
          <span
            className="text-[2.9rem] tracking-[-0.06em] text-ink md:text-[3.3rem]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            AC
          </span>

          <span className="mt-1 text-[0.95rem] text-ink">
            arnaudcrestey.com
          </span>

          <span className="mt-2 h-px w-12 bg-[rgba(23,38,63,0.16)]" />
        </Link>

        <div className="shrink-0 pt-1">
          <div className="inline-flex min-h-[38px] items-center rounded-full border border-[rgba(23,38,63,0.10)] bg-white/92 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5d6f96] shadow-[0_8px_18px_rgba(23,38,63,0.04)] backdrop-blur">
            Diagnostic premium
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
