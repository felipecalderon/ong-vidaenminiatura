import type { EstadoPeticion } from "@/generated/prisma/enums";
import type { peticionModel } from "@/generated/prisma/models/peticion";

export type Peticion = peticionModel;
export type { EstadoPeticion };
