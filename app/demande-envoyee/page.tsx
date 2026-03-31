import Link from "next/link";
import { PageFrame } from "@/components/projection/PageFrame";

export default function DemandeEnvoyeePage() {
  return (
    <PageFrame>
      <section className="premium-panel p-8 md:p-12">
        <h1 className="text-2xl font-semibold md:text-4xl">
          Demande bien reçue.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slateSoft md:text-base">
          Merci pour votre confiance. Votre demande a été transmise avec votre
          projection. Un retour structuré vous sera adressé rapidement pour
          proposer la suite la plus pertinente.
        </p>

        <div className="mt-8">
          <Link
            href="https://arnaudcrestey.com"
            className="inline-flex rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white"
          >
            Continuer sur arnaudcrestey.com
          </Link>
        </div>
      </section>
    </PageFrame>
  );
}
