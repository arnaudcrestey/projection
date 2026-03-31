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
        body: JSON.stringify({
          fullName,
          email,
          organization,
          message,
          projectionSnapshot,
        }),
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
    <form
      onSubmit={handleSubmit}
      className="relative mt-7 overflow-hidden rounded-[24px] border border-[#dbe4f3] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(249,251,255,0.98)_100%)] p-5 shadow-[0_28px_80px_rgba(22,48,100,0.06)] md:mt-10 md:rounded-[26px] md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_32%)]" />

      <div className="relative">
        <div className="max-w-2xl">
          <h3 className="text-[1.08rem] font-semibold leading-tight text-[#12253f] md:text-[1.4rem]">
            Aller plus loin
          </h3>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#6b80a4] md:text-[15px] md:leading-7">
            Si cette projection vous parle, vous pouvez me transmettre vos éléments.
            Je vous reviens avec une proposition structurée.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:mt-7 md:gap-4">
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Nom et prénom"
            className="min-h-[50px] rounded-[15px] border border-[#dbe3f1] bg-white/92 px-4 py-3 text-sm text-[#17304f] outline-none transition placeholder:text-[#9aa8bf] focus:border-[#b8c8e6] focus:bg-white focus:ring-4 focus:ring-[#edf3ff] md:min-h-[54px] md:px-5 md:text-[15px]"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email professionnel"
            className="min-h-[50px] rounded-[15px] border border-[#dbe3f1] bg-white/92 px-4 py-3 text-sm text-[#17304f] outline-none transition placeholder:text-[#9aa8bf] focus:border-[#b8c8e6] focus:bg-white focus:ring-4 focus:ring-[#edf3ff] md:min-h-[54px] md:px-5 md:text-[15px]"
            required
          />

          <input
            type="text"
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
            placeholder="Structure (optionnel)"
            className="min-h-[50px] rounded-[15px] border border-[#dbe3f1] bg-white/92 px-4 py-3 text-sm text-[#17304f] outline-none transition placeholder:text-[#9aa8bf] focus:border-[#b8c8e6] focus:bg-white focus:ring-4 focus:ring-[#edf3ff] md:min-h-[54px] md:px-5 md:text-[15px]"
          />

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Contexte complémentaire (optionnel)"
            rows={4}
            className="min-h-[128px] rounded-[15px] border border-[#dbe3f1] bg-white/92 px-4 py-3 text-sm leading-6 text-[#17304f] outline-none transition placeholder:text-[#9aa8bf] focus:border-[#b8c8e6] focus:bg-white focus:ring-4 focus:ring-[#edf3ff] md:min-h-[150px] md:px-5 md:text-[15px] md:leading-7"
          />
        </div>

        {error ? (
          <p className="mt-4 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="mt-7 flex justify-center md:mt-8">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-h-[50px] w-full max-w-[280px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#3b6cf0_0%,#2e5dd5_100%)] px-6 text-[13px] font-semibold text-white shadow-[0_18px_36px_rgba(47,99,233,0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_42px_rgba(47,99,233,0.3)] disabled:cursor-not-allowed disabled:opacity-60 md:min-h-[54px] md:max-w-[320px] md:px-8 md:text-[15px]"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              "Envoyer ma demande"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
