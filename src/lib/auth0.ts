import { Auth0Client } from "@auth0/nextjs-auth0/server";

/**
 * Instancia del cliente Auth0. Compatible con Edge Runtime (middleware).
 * La sincronización del perfil con la base de datos se realiza mediante
 * sincronizarUsuarioAutenticadoAction() después del login.
 */
export const auth0 = new Auth0Client();
