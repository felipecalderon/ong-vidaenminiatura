import "server-only";
import crypto from "node:crypto";

export function generarTokenInvitacion(): { token: string; tokenHash: string } {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashearToken(token);
  return { token, tokenHash };
}

export function hashearToken(token: string): string {
  return crypto.createHash("sha256").update(token.trim()).digest("hex");
}
