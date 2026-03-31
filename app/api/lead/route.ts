import { NextResponse } from "next/server";
import type { LeadRequest } from "@/lib/projection/types";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadRequest;

    if (!body.fullName?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { success: false, error: "Nom et email sont obligatoires." },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email.trim())) {
      return NextResponse.json(
        { success: false, error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const payload = {
      receivedAt: new Date().toISOString(),
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      organization: body.organization?.trim() || null,
      message: body.message?.trim() || null,
      projectionSnapshot: body.projectionSnapshot ?? null
    };

    console.info("[projection:lead]", JSON.stringify(payload));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Envoi indisponible pour le moment."
      },
      { status: 500 }
    );
  }
}
