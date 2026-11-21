import { toISO } from "./date";
/** Evaluated once at build time (static export). */
export const BUILD_ISO = toISO(new Date());
