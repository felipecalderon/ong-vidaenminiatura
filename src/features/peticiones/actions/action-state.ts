export type ActionState = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
  fields?: {
    titulo?: string;
    resumen?: string;
    contenido?: string;
    meta_firmas?: number;
    categoriaId?: string;
    destacado?: boolean;
  };
};
