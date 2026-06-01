import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

/**
 *
 * @param request By Next
 * @returns NextResponse by Next
 * The proxy layer automatically mounts these authentication routes:
 * /auth/login - Redirects to Auth0 login page
 * /auth/logout - Logs out the user
 * /auth/callback - Handles the OAuth callback
 * /auth/profile - Returns the user profile as JSON
 * /auth/access-token - Returns the access token
 * /auth/backchannel-logout - Receives a logout_token when a configured Back-Channel Logout initiator occurs
 */
export async function proxy(request: NextRequest) {
  const authResponse = await auth0.middleware(request);
  return authResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
