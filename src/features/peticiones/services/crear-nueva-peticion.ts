import { crearPeticion } from "../repositories/crear-peticion";
import type { CrearPeticionInput } from "../schemas/crear-peticion.schema";
import { generarSlugUnico } from "./generar-slug-unico";

export async function crearNuevaPeticion(
  usuarioId: string,
  input: CrearPeticionInput,
  omitirRevision: boolean,
) {
  const slug = await generarSlugUnico(input.titulo);
  return crearPeticion(usuarioId, slug, input, omitirRevision);
}
