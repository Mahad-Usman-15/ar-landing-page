// Shared shape for the contact form action. Kept out of app/actions.ts because
// a "use server" module may only export async functions.

export type ContactValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<keyof ContactValues, string>>;
  /**
   * Echoed back so the form can repopulate itself after a failed submit.
   * React 19 calls `form.reset()` on an uncontrolled form once the action
   * resolves, which restores every field to its `defaultValue` — without this
   * the visitor's typed enquiry is wiped by the very validation error that
   * asks them to correct it.
   */
  values: ContactValues;
};

export const EMPTY_CONTACT_VALUES: ContactValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: EMPTY_CONTACT_VALUES,
};
