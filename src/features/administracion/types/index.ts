export interface ConteosPorEstado {
  total: number;
  porEstado: Record<string, number>;
}

export interface EstadisticasAdministracion {
  noticias: ConteosPorEstado;
  peticiones: ConteosPorEstado;
  publicaciones: ConteosPorEstado;
  recursosEducativos: ConteosPorEstado;
  voluntarios: ConteosPorEstado;
  usuarios: {
    total: number;
    porEstado: Record<string, number>;
    porRol: Record<string, number>;
  };
  categorias: {
    total: number;
    activas: number;
  };
  invitaciones: number;
}
