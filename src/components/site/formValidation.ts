/* Readable native-validation messages for the lead forms.

   The browser's built-in wording for a missing or malformed value varies by
   vendor and locale. These handlers set the site's own copy when a field is
   reported invalid and clear it as soon as the visitor edits the value, so
   native validation keeps working (no submit until the form is valid) with
   consistent, accessible messages. */

import type { FormEvent } from "react";

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export const REQUIRED_FIELD_MESSAGE = "Please complete this field.";
export const EMAIL_FIELD_MESSAGE = "Enter a valid email address.";

export function handleInvalid(e: FormEvent<FieldElement>) {
  const el = e.currentTarget;
  el.setCustomValidity(
    el.validity.valueMissing || el.type !== "email"
      ? REQUIRED_FIELD_MESSAGE
      : EMAIL_FIELD_MESSAGE,
  );
}

export function handleInput(e: FormEvent<FieldElement>) {
  e.currentTarget.setCustomValidity("");
}
