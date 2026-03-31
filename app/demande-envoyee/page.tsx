import Link from "next/link";
import { ReactNode } from "react";

type PageFrameProps = {
  children: ReactNode;
  eyebrow?: string;
};

export function PageFrame({ children, eyebrow }: PageFrameProps) {
  return (
    <main className="min-h-screen bg-page px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            {eyebrow ? (
              <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
                {eyebrow}
              </p>
            ) : null}

            <Link href="/" className="mt-2 inline-flex flex-col leading-none">
              <span className="text-center font-serif text-2xl text-ink md:text-3xl">
                AC
              </span>
              <span className="mt-1 text-[11px] tracking-[0.18em] text-slateSoft md:text-xs">
                arnaudcrestey.com
              </span>
            </Link>
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
