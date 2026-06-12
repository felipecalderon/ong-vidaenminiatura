export type NoticiaActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  fields?: {
    titulo?: string;
    resumen?: string;
    contenido?: string;
    categoriaId?: string;
  };
};
