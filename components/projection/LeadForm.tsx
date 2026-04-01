"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectionResult } from "@/lib/projection/types";

type LeadFormProps = {
  projectionSnapshot: ProjectionResult;
};

type FormState = {
  firstName: string;
  email: string;
  activity: string;
  details: string;
};

const initialState: FormState = {
  firstName: "",
  email: "",
  activity: "",
  details: "",
};

export function LeadForm({ projectionSnapshot }: LeadFormProps) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.firstName.trim() || !form.email.trim()) {
      setError("Merci de renseigner au minimum votre prénom et votre email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          email: form.email.trim(),
          activity: form.activity.trim(),
          details: form.details.trim(),
          projectionSnapshot,
        }),
      });

      if (!response.ok) {
        setError("L’envoi n’a pas pu être finalisé. Merci de réessayer.");
        setLoading(false);
        return;
      }

      router.push("/demande-envoyee");
    } catch {
      setError("Une erreur technique est survenue. Merci de réessayer.");
      setLoading(false);
    }
  }

  return (
    <section className="mt-10 md:mt-14">
      <div className="relative overflow-hidden rounded-[24px] border border-[#d9e4f5] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(247,250,255,0.98)_100%)] px-5 py-6 shadow-[0_24px_64px_rgba(20,45,95,0.06)] sm:rounded-[28px] sm:px-6 sm:py-7 md:px-8 md:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),transparent_30%)]" />
        <div className="pointer-events-none absolute right-[-80px] top-[-80px] h-[180px] w-[180px] rounded-full bg-[rgba(96,126,210,0.05)] blur-3xl" />

        <div className="relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-[#d9e4f3] bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b81a8] shadow-[0_4px_14px_rgba(92,116,202,0.08)] md:text-[11px]">
              Aller plus loin
            </div>

            <h2 className="mt-4 text-[24px] font-semibold leading-tight tracking-[-0.035em] text-[#102b52] sm:text-[28px] md:text-[34px] md:leading-[1.1]">
              Clarifier ce qui freine vraiment votre activité
            </h2>

            <p className="mt-4 text-[14px] leading-7 text-[#5d7399] md:text-[16px] md:leading-8">
              Ce premier diagnostic pose une base utile. Si vous voulez aller
              plus loin, je peux vous aider à rendre votre activité plus lisible,
              plus cohérente et plus simple à engager.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center rounded-full border border-[#d9e4f5] bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[#5b74a0]">
                Réponse personnalisée
              </span>
              <span className="inline-flex items-center rounded-full border border-[#d9e4f5] bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[#5b74a0]">
                Sans engagement
              </span>
              <span className="inline-flex items-center rounded-full border border-[#d9e4f5] bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[#5b74a0]">
                Retour clair et concret
              </span>
            </div>
          </div>

          <div className="my-7 h-px bg-[linear-gradient(90deg,rgba(201,214,237,0.2)_0%,rgba(201,214,237,0.9)_18%,rgba(201,214,237,0.9)_82%,rgba(201,214,237,0.2)_100%)] md:my-8" />

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              <label className="block">
                <span className="mb-2 block text-[12px] font-medium text-[#5e7397] md:text-[13px]">
                  Nom et prénom
                </span>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(event) => updateField("firstName", event.target.value)}
                  placeholder="Ex. Arnaud Crestey"
                  className="min-h-[54px] w-full rounded-[16px] border border-[#d9e3f2] bg-white px-4 text-[14px] text-[#17304f] shadow-[inset_0_1px_2px_rgba(15,23,42,0.02)] outline-none transition placeholder:text-[#9aacbf] focus:border-[#b7c9e8] focus:ring-4 focus:ring-[#eaf1ff] md:min-h-[56px] md:text-[15px]"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[12px] font-medium text-[#5e7397] md:text-[13px]">
                  Email professionnel
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="Ex. bonjour@votresite.fr"
                  className="min-h-[54px] w-full rounded-[16px] border border-[#d9e3f2] bg-white px-4 text-[14px] text-[#17304f] shadow-[inset_0_1px_2px_rgba(15,23,42,0.02)] outline-none transition placeholder:text-[#9aacbf] focus:border-[#b7c9e8] focus:ring-4 focus:ring-[#eaf1ff] md:min-h-[56px] md:text-[15px]"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-[12px] font-medium text-[#5e7397] md:text-[13px]">
                Votre activité
              </span>
              <input
                type="text"
                value={form.activity}
                onChange={(event) => updateField("activity", event.target.value)}
                placeholder="Ex. Conseil, accompagnement, formation, activité digitale..."
                className="min-h-[54px] w-full rounded-[16px] border border-[#d9e3f2] bg-white px-4 text-[14px] text-[#17304f] shadow-[inset_0_1px_2px_rgba(15,23,42,0.02)] outline-none transition placeholder:text-[#9aacbf] focus:border-[#b7c9e8] focus:ring-4 focus:ring-[#eaf1ff] md:min-h-[56px] md:text-[15px]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-medium text-[#5e7397] md:text-[13px]">
                Ce que vous souhaitez clarifier
              </span>
              <textarea
                value={form.details}
                onChange={(event) => updateField("details", event.target.value)}
                placeholder="Expliquez en quelques lignes ce qui vous semble encore flou, ce que vous voulez améliorer, ou ce que vous attendez."
                rows={5}
                className="min-h-[150px] w-full resize-y rounded-[18px] border border-[#d9e3f2] bg-white px-4 py-3.5 text-[14px] leading-7 text-[#17304f] shadow-[inset_0_1px_2px_rgba(15,23,42,0.02)] outline-none transition placeholder:text-[#9aacbf] focus:border-[#b7c9e8] focus:ring-4 focus:ring-[#eaf1ff] md:px-5 md:py-4 md:text-[15px]"
              />
            </label>

            {error ? (
              <p className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <div className="pt-1 md:pt-2">
              <div className="flex flex-col items-center gap-4 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#2f63e9_0%,#2d58cf_100%)] px-7 text-[14px] font-semibold tracking-[0.01em] text-white shadow-[0_16px_34px_rgba(47,99,233,0.24)] transition hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(47,99,233,0.3)] disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-[320px] md:min-h-[54px] md:px-8 md:text-[15px]"
                >
                  {loading ? "Envoi en cours..." : "Recevoir un retour sur mon activité"}
                </button>

                <p className="max-w-xl text-center text-[12px] leading-6 text-[#7b8dab] md:text-[13px]">
                  Vous recevez un retour personnalisé pour voir si un travail de
                  clarification plus poussé peut réellement vous être utile.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
