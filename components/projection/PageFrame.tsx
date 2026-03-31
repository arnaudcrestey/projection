import Link from "next/link";

type PageFrameProps = {
  children: React.ReactNode;
  eyebrow?: string;
};

export function PageFrame({ children, eyebrow = "PROJECTION" }: PageFrameProps) {
  return (
    <div className="premium-shell">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slateSoft">{eyebrow}</p>
          <p className="mt-2 text-sm text-slateSoft">Un point d'entrée clair pour structurer votre activité.</p>
        </div>
        <Link
          href="https://arnaudcrestey.com"
          className="rounded-full border border-mist px-4 py-2 text-xs font-medium text-ink transition hover:bg-white"
        >
          arnaudcrestey.com
        </Link>
      </header>
      {children}
    </div>
  );
}
