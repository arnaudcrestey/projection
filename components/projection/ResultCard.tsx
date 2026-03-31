import type { ProjectionResult } from "@/lib/projection/types";

type ResultCardProps = {
  title: string;
  content: string;
};

function Item({ title, content }: ResultCardProps) {
  return (
    <section className="premium-panel p-6 md:p-7">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slateSoft">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink">{content}</p>
    </section>
  );
}

export function ResultCards({ result }: { result: ProjectionResult }) {
  return (
    <div className="grid gap-4">
      <Item title="Vision" content={result.vision} />
      <Item title="Message central" content={result.centralMessage} />
      <Item title="Expérience utilisateur projetée" content={result.userExperience} />
      <Item title="Point d'entrée recommandé" content={result.recommendedEntryPoint} />
      <Item title="Note finale" content={result.closingNote} />
    </div>
  );
}
