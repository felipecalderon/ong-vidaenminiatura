# Reglas para construir la base de carpetas y archivos, iniciando por un ejemplo práctico:

## schema.prisma

Define:

```text
Base de datos
```

Ejemplo:

```prisma
model peticion {
  titulo    String
  resumen   String
  contenido String
}
```

Eso le dice a PostgreSQL y Prisma:

```text
Qué columnas existen
Qué tipos tienen
Qué relaciones existen
```

Nada más.

---

## features/peticiones/schemas

Define:

```text
Validación de entrada
```

Ejemplo:

```ts
export const crearPeticionSchema = z.object({
  titulo: z.string().min(10).max(200),
  resumen: z.string().min(50).max(500),
  contenido: z.string().min(100),
  categoriaId: z.uuid(),
});
```

Esto resuelve:

```text
¿Es válido este formulario?
```

antes de tocar la base de datos.

---

# Lo que yo pondría

## features/peticiones/schemas/crear-peticion.schema.ts

```ts
export const crearPeticionSchema = z.object({
  titulo: z.string().min(10).max(200),
  resumen: z.string().min(50).max(500),
  contenido: z.string().min(100),
  categoriaId: z.uuid(),
});
```

---

## features/peticiones/schemas/editar-peticion.schema.ts

```ts
export const editarPeticionSchema = z.object({
  titulo: z.string().min(10).max(200),
  resumen: z.string().min(50).max(500),
  contenido: z.string().min(100),
  categoriaId: z.uuid(),
});
```

Puede ser idéntico al principio.

No importa.

Más adelante divergen.

---

## features/peticiones/schemas/publicar-peticion.schema.ts

```ts
export const publicarPeticionSchema = z.object({
  peticionId: z.uuid(),
});
```

---

## features/peticiones/schemas/cerrar-peticion.schema.ts

```ts
export const cerrarPeticionSchema = z.object({
  peticionId: z.uuid(),
});
```

---

## features/peticiones/schemas/archivar-peticion.schema.ts

```ts
export const archivarPeticionSchema = z.object({
  peticionId: z.uuid(),
});
```

---

# Un error común que se debe evitar:

Crear:

```ts
peticionSchema;
```

gigante.

Por ejemplo:

```ts
const peticionSchema = z.object({
  ...
});
```

y usarlo para:

```text
crear
editar
publicar
cerrar
archivar
```

Todo.

Eso termina mal.

Cada caso de uso tiene reglas distintas.

---

# Estructura preferida

```text
features/
└── peticiones/
    ├── actions/
    ├── components/
    ├── queries/
    ├── services/
    ├── types/
    └── schemas/
        ├── crear-peticion.schema.ts
        ├── editar-peticion.schema.ts
        ├── publicar-peticion.schema.ts
        ├── cerrar-peticion.schema.ts
        └── archivar-peticion.schema.ts
```

Porque refleja directamente los casos de uso.

---

# Lo que NO pondría allí

No pondría:

```ts
type Peticion
```

Eso pertenece a:

```text
types/
```

o directamente a Prisma.

---

No pondría:

```ts
EstadoPeticion;
Rol;
EstadoUsuario;
```

Porque ya vienen generados desde Prisma.

---

No pondría:

```ts
interface CrearPeticionDTO
```

si ya puedes inferirlo desde Zod:

```ts
export type CrearPeticionInput = z.infer<typeof crearPeticionSchema>;
```

---

Regla práctica es:

```text
schema.prisma
↓
estructura de persistencia

features/*/schemas
↓
validación de casos de uso
```

Son capas distintas y ambas son necesarias. El hecho de tener Prisma no elimina la necesidad de tener schemas Zod; simplemente evita que tengas que definir manualmente modelos y enums duplicados.

# Types

Antes de crear un type, pregúntate:

¿Prisma ya lo genera?

Si la respuesta es sí:

import type { peticion } from "@/generated/prisma..";

o

import { Rol } from "@/generated/prisma";

entonces no crees otro.
