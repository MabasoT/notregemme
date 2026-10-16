"use client";

import { useId, useState } from "react";
import { signupCopy } from "@/lib/content";
import { whatsappOrderLink } from "@/lib/site-config";
import { submitSignup, type SignupList } from "@/lib/subscribe";
import { isValidEmail } from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "error" | "unavailable";

interface SignupFormProps {
  /** Which list the address joins — also picks the button + success copy. */
  list: SignupList;
  /** "row" sits inline (newsletter bar); "stack" fills a narrow card. */
  layout: "row" | "stack";
}

/**
 * Email capture shared by the newsletter bar and drop-alert cards.
 * Explicit idle / sending / success / error states; when no backend is
 * connected it hands the visitor a pre-filled WhatsApp message instead of
 * faking a success.
 */
export function SignupForm({ list, layout }: SignupFormProps): React.ReactElement {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setError(signupCopy.invalidEmail);
      return;
    }
    setStatus("sending");
    const result = await submitSignup(email.trim(), list, company);
    if (result.ok) {
      setStatus("success");
      return;
    }
    if (result.unavailable) {
      setStatus("unavailable");
      return;
    }
    setStatus("error");
    setError(result.error ?? signupCopy.genericError);
  }

  if (status === "success") {
    return (
      <p role="status" className="signup-success">
        <span aria-hidden="true">♦</span> {signupCopy.success[list]}
      </p>
    );
  }

  const stacked = layout === "stack";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={stacked ? "flex w-full flex-col gap-2.5" : "flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap"}
    >
      <label htmlFor={inputId} className="sr-only">
        {signupCopy.emailLabel}
      </label>
      <input
        id={inputId}
        type="email"
        name="email"
        autoComplete="email"
        inputMode="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={signupCopy.placeholder}
        aria-invalid={status === "error"}
        aria-describedby={messageId}
        className={stacked ? "newsletter-input w-full" : "newsletter-input w-full sm:w-[280px] sm:flex-1"}
      />
      {/* Honeypot — hidden from people and assistive tech; bots fill it. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="honeypot"
      />
      <button
        type="submit"
        className={stacked ? "btn-primary w-full" : "btn-primary"}
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? signupCopy.sending : signupCopy.submit[list]}
      </button>
      <p id={messageId} aria-live="polite" className="signup-message w-full">
        {status === "error" ? error : null}
        {status === "unavailable" ? (
          <>
            {signupCopy.unavailable}{" "}
            <a
              href={whatsappOrderLink(signupCopy.whatsappMessage(email.trim()))}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {signupCopy.whatsappFallback} →
            </a>
          </>
        ) : null}
      </p>
    </form>
  );
}
