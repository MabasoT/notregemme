/**
 * Shared input validation, used by client forms and server routes so
 * both sides accept and reject exactly the same values.
 */

/** Pragmatic email check: something@something.tld with no spaces. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** RFC 5321 caps an address at 254 characters. */
export const MAX_EMAIL_LENGTH = 254;

/**
 * Returns true when the value looks like a deliverable email address.
 *
 * @param value - raw user input (whitespace is trimmed first)
 * @returns whether the trimmed value matches EMAIL_PATTERN and length cap
 * @example
 *   isValidEmail(" hello@notregemme.co.za ") // → true
 *   isValidEmail("hello@") // → false
 */
export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(trimmed);
}
