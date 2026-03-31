"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectionResult } from "@/lib/projection/types";

type LeadFormProps = {
  projectionSnapshot: ProjectionResult;
};

export function LeadForm({ projectionSnapshot }: LeadFormProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim()) {
      setError("Merci d’indiquer votre nom et votre email professionnel.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, organization, message, projectionSnapshot })
      });

      if (!response.ok) {
        setError("L’envoi n’a pas pu être finalisé. Vous pouvez réessayer dans quelques instants.");
        return;
      }

      router.push("/demande-envoyee");
    } catch {
      setError("Une erreur technique est survenue. Merci de réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="premium-panel mt-6 p-6 md:p-7">
      <h3 className="text-lg font-semibold">Demander un échange ciblé</h3>
      <p className="mt-2 text-sm text-slateSoft">
        Si cette projection vous parle, laissez vos coordonnées. Vous recevrez une proposition d’échange
        structurée.
      </p>

      <div className="mt-6 grid gap-4">
        <input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Nom et prénom"
          className="rounded-xl border border-mist bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-slateSoft"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email professionnel"
          className="rounded-xl border border-mist bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-slateSoft"
          required
        />
        <input
          type="text"
          value={organization}
          onChange={(event) => setOrganization(event.target.value)}
          placeholder="Structure (optionnel)"
          className="rounded-xl border border-mist bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-slateSoft"
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Contexte complémentaire (optionnel)"
          rows={4}
          className="rounded-xl border border-mist bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-slateSoft"
        />
      </div>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
