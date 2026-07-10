export const ROL_CONFIG = {
  ADMINISTRADOR: {
    label: "Admin",
    classes:
      "bg-destructive/15 text-destructive border-destructive/30 dark:bg-destructive/20 dark:text-red-400",
  },
  AUTOR: {
    label: "Autor",
    classes:
      "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30 dark:bg-amber-500/20",
  },
  USUARIO: {
    label: "Usuario",
    classes: "bg-primary/15 text-primary border-primary/30 dark:bg-primary/20",
  },
} as const;

export type RolLabel = keyof typeof ROL_CONFIG;
