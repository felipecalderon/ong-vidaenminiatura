import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
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
  const pathname = request.nextUrl.pathname;

  if (/^\/auth(?:\/|$)/.test(pathname)) {
    return auth0.middleware(request);
  }

  const authResponse = await auth0.middleware(request);
  const requerimientoAcceso = resolverRequerimientoAcceso(pathname);

  if (!requerimientoAcceso) {
    return authResponse;
  }

  // Las peticiones RSC del cliente no pueden seguir redirecciones cross-origin
  // a Auth0 por CORS. Para RSC, dejamos que el page-level redirect() lo maneje.
  const esRsc =
    request.headers.get("rsc") === "1" ||
    request.nextUrl.searchParams.has("_rsc");

  if (esRsc) {
    return authResponse;
  }

  // Solo verificamos que el usuario tenga una sesión Auth0 válida (sub presente).
  // La autorización por rol/estado la manejan las propias páginas mediante
  // obtenerUsuarioAutenticado() + redirect(), ya que esos campos viven en la BD
  // local y no en el JWT de Auth0.
  const session = await auth0.getSession(request);

  if (!session?.user?.sub) {
    return redirigirALogin(request);
  }

  return authResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

type RequerimientoAcceso = "contenido" | "backoffice";

const RUTAS_BACKOFFICE = [
  /^\/dashboard(?:\/|$)/,
  /^\/admin(?:\/|$)/,
  /^\/backoffice(?:\/|$)/,
  /^\/administracion(?:\/|$)/,
];

const RUTAS_CONTENIDO = [
  /^\/peticiones\/crear(?:\/|$)/,
  /^\/noticias\/crear(?:\/|$)/,
  /^\/peticiones\/[^/]+\/editar(?:\/|$)/,
  /^\/noticias\/[^/]+\/editar(?:\/|$)/,
];

function resolverRequerimientoAcceso(
  pathname: string,
): RequerimientoAcceso | null {
  if (RUTAS_BACKOFFICE.some((expresion) => expresion.test(pathname))) {
    return "backoffice";
  }

  if (RUTAS_CONTENIDO.some((expresion) => expresion.test(pathname))) {
    return "contenido";
  }

  return null;
}

function redirigirALogin(request: NextRequest) {
  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set(
    "returnTo",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}
