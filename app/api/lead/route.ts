import { NextResponse } from "next/server";
import type { ProjectionResult } from "@/lib/projection/types";

type LeadRequest = {
  firstName?: string;
  email?: string;
  activity?: string;
  details?: string;
  projectionSnapshot?: ProjectionResult | null;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadRequest;

    const firstName = body.firstName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const activity = body.activity?.trim() ?? "";
    const details = body.details?.trim() ?? "";

    if (!firstName || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Le prénom et l’email sont obligatoires.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Adresse email invalide.",
        },
        { status: 400 }
      );
    }

    const payload = {
      receivedAt: new Date().toISOString(),
      firstName,
      email,
      activity: activity || null,
      details: details || null,
      projectionSnapshot: body.projectionSnapshot ?? null,
    };

    console.info("[projection:lead]", JSON.stringify(payload));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Envoi indisponible pour le moment.",
      },
      { status: 500 }
    );
  }
}
