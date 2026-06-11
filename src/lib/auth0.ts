import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { resolverAccesoUsuario } from "@/features/usuarios/access";
import { asegurarUsuarioDesdeAuth0 } from "@/features/usuarios/services/asegurar-usuario-desde-auth0";

export const auth0 = new Auth0Client({
  beforeSessionSaved: async (session) => {
    if (session?.user) {
      const usuario = await asegurarUsuarioDesdeAuth0(session.user);
      const acceso = resolverAccesoUsuario(usuario);

      session.user.usuarioId = usuario.id;
      session.user.rol = usuario.rol;
      session.user.estado = usuario.estado;
      session.user.usuario = {
        id: usuario.id,
        auth0Id: usuario.auth0_id,
        correo: usuario.correo,
        nombre: usuario.nombre,
        picture: usuario.picture,
        rol: usuario.rol,
        estado: usuario.estado,
        acceso,
      };
    }

    return session;
  },
});
