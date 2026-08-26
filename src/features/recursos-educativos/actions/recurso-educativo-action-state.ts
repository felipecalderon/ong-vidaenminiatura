export type RecursoEducativoActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  fields?: {
    titulo?: string;
    resumen?: string;
    contenido?: string;
    tipo?: string;
    categoriaId?: string;
  };
};
