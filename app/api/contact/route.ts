import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * This is intentionally a lightweight stub so the site works out-of-the-box.
 * The client (components/contact-section.tsx) gracefully falls back to a
 * `mailto:` link if this route is not fully wired up.
 *
 * To actually deliver email, plug in a provider inside the try block below,
 * e.g. Resend, SendGrid, Nodemailer, or a Formspree/Getform webhook, and read
 * the API key from an environment variable (never hard-code secrets):
 *
 *   const { Resend } = await import("resend");
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "portfolio@yourdomain.com",
 *     to: "nishashrestha5470@gmail.com",
 *     subject: `Portfolio enquiry from ${name}`,
 *     replyTo: email,
 *     text: message,
 *   });
 */
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Basic email sanity check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    // TODO: integrate an email provider here (see file header).
    // Until then, we signal a non-OK status so the client uses its mailto
    // fallback and the visitor's message is never silently dropped.
    return NextResponse.json(
      { ok: false, error: "Email delivery not configured." },
      { status: 501 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
