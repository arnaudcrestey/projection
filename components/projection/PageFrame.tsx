import Link from "next/link";
import type { ReactNode } from "react";

type PageFrameProps = {
  children: ReactNode;
};

export function PageFrame({ children }: PageFrameProps) {
  return (
    <div className="premium-shell">
      <header className="mb-10 flex w-full items-start justify-between gap-6">
        <Link
          href="/"
          className="inline-flex shrink-0 flex-col items-center text-center leading-none"
        >
          <span
            className="text-[2.9rem] tracking-[-0.06em] text-ink md:text-[3.3rem]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            AC
          </span>

          <span className="mt-1 text-[0.95rem] text-ink">
            arnaudcrestey.com
          </span>

          <span className="mt-2 block h-px w-12 bg-[rgba(23,38,63,0.16)]" />
        </Link>

        <div className="shrink-0 pt-1">
          <div className="inline-flex min-h-[32px] items-center rounded-full border border-[rgba(23,38,63,0.07)] bg-white/55 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[rgba(93,111,150,0.78)] shadow-[0_4px_12px_rgba(23,38,63,0.03)] backdrop-blur">
            Diagnostic premium
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
