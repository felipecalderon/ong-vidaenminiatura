export type PublicacionActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  fields?: {
    titulo?: string;
    resumen?: string;
    contenido?: string;
    tipo?: string;
    autores?: string;
    anio?: string;
    enlace?: string;
    lugar?: string;
    fechaEvento?: string;
  };
};
