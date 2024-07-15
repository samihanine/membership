"use server";

import { google } from "googleapis";

const { OAuth2 } = google.auth;

export const buildHtmlTemplate = (props: {
  subject: string;
  content: string;
  actionUrl?: string;
}): string => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <title>Email Template</title>
  </head>
  <body style="background-color: #f0f0f0; font-family: Arial, sans-serif; color: #333; margin: 0; padding: 20px;">
      <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
              <td align="center">
                  <table width="600px" cellspacing="0" cellpadding="20" style="background-color: #ffffff;">
                      <tr>
                          <td align="center" style="font-size: 24px; font-weight: bold; color: #000000;">
                              ${props.subject}
                          </td>
                      </tr>
                      <tr>
                          <td style="font-size: 16px; color: #404040;">
                              ${props.content}
                          </td>
                      </tr>
                      ${
                        props.actionUrl
                          ? `<tr>
                          <td align="center" style="padding-top: 20px;">
                              <a href="${props.actionUrl}" style="background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Cliquez ici</a>
                          </td>
                      </tr>`
                          : ""
                      }
                  </table>
              </td>
          </tr>
          <tr>
              <td align="center" style="font-size: 12px; color: #707070; padding-top: 20px;">
                  Printags | 123 Rue Fictive, Ville, 10000<br>
                  Email: contact@printags.fr | Tel: +33 1 23 45 67 89
              </td>
          </tr>
      </table>
  </body>
  </html>`;
};

export const sendEmail = async (props: {
  to: string;
  subject: string;
  html: string;
}) => {
  const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground",
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const email = [
    'Content-Type: text/html; charset="UTF-8"\n',
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    `to: ${props.to}\n`,
    "from: contact@voolta.fr\n",
    "subject: =?utf-8?B?" +
      Buffer.from(props.subject).toString("base64") +
      "?=\n\n",
    props.html,
  ].join("");

  // L'email doit être encodé en base64url
  const encodedEmail = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email", error);
  }
};
