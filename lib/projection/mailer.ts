export async function sendUserAutoReplyEmail(
  params: {
    firstName: string;
    email: string;
  }
) {
  const transporter = createTransporter();
  const user = process.env.EMAIL_USER;

  const formattedFirstName =
    params.firstName.charAt(0).toUpperCase() +
    params.firstName.slice(1).toLowerCase();

  const safeFirstName = escapeHtml(formattedFirstName);
  const recipientEmail = params.email.trim();

  if (!recipientEmail) {
    throw new Error("Adresse email utilisateur manquante.");
  }

  const subject = "Votre demande a bien été reçue";

  const html = `
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
                <p style="margin:0 0 16px 0;">Bonjour ${safeFirstName},</p>

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

  const text = [
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

  await transporter.sendMail({
    from: `Arnaud Crestey <${user}>`,
    to: recipientEmail,
    subject,
    text,
    html,
  });
}
