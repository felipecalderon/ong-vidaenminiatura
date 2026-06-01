import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { asegurarUsuarioDesdeAuth0 } from "@/features/usuarios/services";

export const auth0 = new Auth0Client({
  beforeSessionSaved: async (session) => {
    if (session?.user) {
      await asegurarUsuarioDesdeAuth0(session.user);
    }

    return session;
  },
});
