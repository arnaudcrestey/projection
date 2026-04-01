import nodemailer from "nodemailer";
import type { ProjectionResult } from "@/lib/projection/types";

type SendProjectionLeadEmailParams = {
  firstName: string;
  email: string;
  activity?: string;
  details?: string;
  projectionSnapshot?: ProjectionResult | null;
};

type SendUserAutoReplyEmailParams = {
  firstName: string;
  email: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 465);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    throw new Error("Configuration email incomplète.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

function buildProjectionHtml({
  firstName,
  email,
  activity,
  details,
  projectionSnapshot,
}: SendProjectionLeadEmailParams) {
  const vision = projectionSnapshot?.vision ?? "Non renseigné";
  const clarity = projectionSnapshot?.clarity ?? "Non renseigné";
  const nextStep = projectionSnapshot?.nextStep ?? "Non renseigné";

  return `
    <div style="font-family:Arial,Helvetica,sans-serif; color:#17304f; line-height:1.6; background:#f6f9ff; padding:32px;">
      <div style="max-width:720px; margin:0 auto; background:#ffffff; border:1px solid #dbe6f6; border-radius:20px; padding:32px;">
        <p style="margin:0 0 8px; font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#6f83a7; font-weight:700;">
          Nouveau lead Projection
        </p>

        <h1 style="margin:0 0 20px; font-size:28px; line-height:1.2; color:#102b52;">
          Nouvelle demande reçue
        </h1>

        <div style="margin:0 0 24px; padding:18px 20px; background:#f8fbff; border:1px solid #e3eaf5; border-radius:16px;">
          <p style="margin:0 0 8px;"><strong>Prénom :</strong> ${escapeHtml(firstName)}</p>
          <p style="margin:0 0 8px;"><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p style="margin:0 0 8px;"><strong>Activité :</strong> ${escapeHtml(activity || "Non renseignée")}</p>
          <p style="margin:0;"><strong>Détails :</strong><br/>${escapeHtml(details || "Non renseignés")}</p>
        </div>

        <h2 style="margin:0 0 12px; font-size:18px; color:#173b73;">Projection associée</h2>

        <div style="display:grid; gap:12px;">
          <div style="padding:16px 18px; background:#fbfdff; border:1px solid #e3eaf5; border-radius:14px;">
            <p style="margin:0 0 6px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#6f83a7; font-weight:700;">
              Vision
            </p>
            <p style="margin:0;">${escapeHtml(vision)}</p>
          </div>

          <div style="padding:16px 18px; background:#fbfdff; border:1px solid #e3eaf5; border-radius:14px;">
            <p style="margin:0 0 6px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#6f83a7; font-weight:700;">
              Diagnostic
            </p>
            <p style="margin:0;">${escapeHtml(clarity)}</p>
          </div>

          <div style="padding:16px 18px; background:#fbfdff; border:1px solid #e3eaf5; border-radius:14px;">
            <p style="margin:0 0 6px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:#6f83a7; font-weight:700;">
              Suite proposée
            </p>
            <p style="margin:0;">${escapeHtml(nextStep)}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildProjectionText({
  firstName,
  email,
  activity,
  details,
  projectionSnapshot,
}: SendProjectionLeadEmailParams) {
  return `
Nouveau lead Projection

Prénom : ${firstName}
Email : ${email}
Activité : ${activity || "Non renseignée"}
Détails : ${details || "Non renseignés"}

Projection :
- Vision : ${projectionSnapshot?.vision ?? "Non renseigné"}
- Diagnostic : ${projectionSnapshot?.clarity ?? "Non renseigné"}
- Suite proposée : ${projectionSnapshot?.nextStep ?? "Non renseigné"}
`.trim();
}

function buildUserAutoReplyHtml({ firstName }: SendUserAutoReplyEmailParams) {
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  return `
  <div style="margin:0;padding:0;background-color:#eef2f8;">
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="border-collapse:collapse;background-color:#eef2f8;padding:26px 12px;"
    >
      <tr>
        <td align="center">
          <table
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              max-width:600px;
              border-collapse:separate;
              border-spacing:0;
              background:#ffffff;
              border:1px solid #dbe3f0;
              border-radius:20px;
              overflow:hidden;
              box-shadow:0 10px 28px rgba(31,39,64,0.05);
            "
          >
            <tr>
              <td style="padding:22px 26px 14px 26px;border-bottom:1px solid #e5ebf5;">
                <div
                  style="
                    font-family:Arial,sans-serif;
                    font-size:11px;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    color:#6c7ea6;
                    margin-bottom:8px;
                  "
                >
                  DIAGNOSTIC STRATÉGIQUE
                </div>

                <div
                  style="
                    font-family:Arial,sans-serif;
                    font-size:24px;
                    font-weight:600;
                    color:#1f2740;
                    margin:0;
                  "
                >
                  Votre demande a bien été reçue
                </div>
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding:24px 26px 8px 26px;
                  font-family:Arial,sans-serif;
                  color:#33415c;
                  font-size:15px;
                  line-height:1.75;
                "
              >
                <p style="margin:0 0 16px 0;">Bonjour ${escapeHtml(formattedFirstName)},</p>

                <p style="margin:0 0 16px; font-size:15px; line-height:1.8; color:#52617f;">
                  Merci pour votre demande.
                </p>

                <p style="margin:0 0 16px; font-size:15px; line-height:1.8; color:#52617f;">
                  J’ai bien reçu les éléments transmis via le diagnostic stratégique.
                </p>

                <p style="margin:0 0 22px; font-size:15px; line-height:1.8; color:#52617f;">
                  Je vais reprendre votre situation avec attention afin d’en dégager les points essentiels, puis vous adresser un retour personnalisé.
                </p>

                <p style="margin:0 0 14px 0;color:#5b6b8c;text-align:center;">
                  Bien à vous,
                </p>

                <div style="text-align:center;">
                  <div style="font-family:Georgia,serif;font-size:28px;color:#1f2740;">AC</div>
                  <a href="https://arnaudcrestey.com" style="color:#2f63e9;text-decoration:none;font-size:13px;">
                    arnaudcrestey.com
                  </a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
`;
}

function buildUserAutoReplyText({ firstName }: SendUserAutoReplyEmailParams) {
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  return [
    `Bonjour ${formattedFirstName},`,
    "",
    "Merci pour votre demande.",
    "",
    "J’ai bien reçu les éléments transmis via le diagnostic stratégique.",
    "",
    "Je vais reprendre votre situation avec attention afin d’en dégager les points essentiels, puis vous adresser un retour personnalisé.",
    "",
    "Bien à vous,",
    "Arnaud Crestey",
    "arnaudcrestey.com",
  ].join("\n");
}

export async function sendProjectionLeadEmail(
  params: SendProjectionLeadEmailParams
) {
  const transporter = createTransporter();
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.EMAIL_USER;

  if (!to || !from) {
    throw new Error("Destinataire email non configuré.");
  }

  await transporter.sendMail({
    from: `Arnaud Crestey <${from}>`,
    to,
    replyTo: params.email,
    subject: `Nouvelle demande Projection — ${params.firstName}`,
    text: buildProjectionText(params),
    html: buildProjectionHtml(params),
  });
}

export async function sendUserAutoReplyEmail(
  params: SendUserAutoReplyEmailParams
) {
  const transporter = createTransporter();
  const from = process.env.EMAIL_USER;

  if (!from) {
    throw new Error("Expéditeur email non configuré.");
  }

  await transporter.sendMail({
    from: `Arnaud Crestey <${from}>`,
    to: params.email,
    subject: "Votre demande a bien été reçue",
    text: buildUserAutoReplyText(params),
    html: buildUserAutoReplyHtml(params),
  });
}
