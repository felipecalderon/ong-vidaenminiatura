# Auditoría y Plan de Atomización — vidaenminiatura

## 0. Evaluación del diagnóstico propuesto

La organización por _features_ es correcta y debe mantenerse intacta.
Errores detectados:

1. Hay **bugs funcionales reales** causados por duplicación de código (sección 1), no solo problemas de estilo.
2. Hay un **riesgo arquitectónico** (`"use server"` mal aplicado, sección 2) más grave que el tamaño de archivo: contradice la propia regla en `AGENTS.md` y abre superficie de invocación innecesaria.
3. La atomización (sección 3-5) sí es necesaria, pero es la causa raíz de (1), no un problema cosmético independiente.

Orden de prioridad real: **bugs → riesgo arquitectónico → duplicación/atomización → cosmético**.

---

## 1. Hallazgos críticos (bugs funcionales)

### 1.1 Doble subida a Cloudinary en edición

**Archivos:** `features/noticias/actions/editar-noticia.ts`, `features/peticiones/actions/editar-peticion.ts`

Ambos contienen el mismo bloque copiado dos veces dentro de la misma función:

```ts
if (imagenFile && imagenFile.size > 0) {
  try {
    imagenUrl = await subirImagenACloudinary(imagenFile);
  } catch (_e) {
    return { success: false, error: "..." };
  }
}
// ... se construye rawData ...
if (imagenFile && imagenFile.size > 0) {
  // <- bloque duplicado
  try {
    imagenUrl = await subirImagenACloudinary(imagenFile);
  } catch (_e) {
    return { success: false, error: "...", fields: rawData };
  }
}
```

**Efecto:** cada edición con imagen nueva sube el archivo dos veces (costo, latencia, dos `secure_url` generados donde gana el segundo). No es diseño intencional, es copy-paste — y es la prueba más concreta de por qué esta lógica debe vivir en un solo lugar.

**Fix:**

```ts
// src/lib/cloudinary.ts
export async function subirImagenSiExiste(
  file: File | null,
): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;
  return subirImagenACloudinary(file);
}
```

Una sola llamada por action, antes de construir `rawData`. Elimina el segundo bloque por completo.

### 1.2 El Home no usa la capa de datos real

**Archivo:** `src/app/page.tsx`

```ts
export default function HomePage() {                  // <- no es async
  const peticiones = getPeticionesPublicadas().slice(0, 4); // lib/mock-data.ts
  const noticias = getNoticiasPublicadas().slice(0, 3);     // lib/mock-data.ts
```

Es la **única** página pública que no llama a `obtenerListaPeticionesActivas` / `obtenerListaNoticiasPublicadas` como sí hacen `/peticiones` y `/noticias`. Sirve datos mock en producción.

Agravante: `PeticionCard` (`features/peticiones/components/peticion-card.tsx`) tipa su prop con `import type { Peticion } from "@/lib/mock-data"` en vez de `@/features/peticiones/types`. El tipo mock tiene `imagen: string`; el tipo real de Prisma tiene `imagen: string | null`. Cuando conectes el home a datos reales vas a tener un mismatch de tipos que hoy está oculto.

**Fix:** reemplazar por las queries reales (`obtenerListaPeticionesActivas`, `obtenerListaNoticiasPublicadas`), tipar `PeticionCardProps`/`NoticiaCardProps` con los tipos de `features/*/types`, eliminar `src/lib/mock-data.ts` (~500 líneas muertas tras el cambio).

### 1.3 Posible doble sistema de toast sin renderer activo

Conviven dos APIs de notificación con firmas distintas:

| Origen                      | Firma usada                              | Dónde                                                                                                          | `<Toaster/>` montado en `layout.tsx` |
| --------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `sonner`                    | `toast.error("mensaje")`                 | `use-crear-noticia-form.ts`                                                                                    | Sí                                   |
| `@/components/ui/use-toast` | `toast({ title, description, variant })` | `use-gestion-categorias.ts`, `use-gestion-noticias.ts`, `use-gestion-peticiones.ts`, `use-gestion-usuarios.ts` | No detectado                         |

La firma `{ title, description, variant }` es la API clásica del hook de Toast de shadcn/Radix, no la de sonner (que es posicional: `toast("texto", opts)`). Si `components/ui/use-toast.ts` es el hook estándar generado por shadcn — lo más probable dado tu `components.json` — necesita su propio `<Toaster/>` de `@/components/ui/toaster` montado en algún punto del árbol, y eso no aparece en `layout.tsx`.

`use-toast.ts` Se debe eliminar junto a sus dependencias y mantener el toaster de sonner

**Fix:** unificar todo en `sonner` (ya está montado, es más liviano). Reemplazar `useToast()` por `toast.success(...)`/`toast.error(...)` en las 4 hooks de gestión.

### 1.4 Schemas Zod muertos para firmar petición

Existen **dos** schemas distintos para la misma operación, ninguno usado:

- `features/firmas/schemas/firmar-peticion.schema.ts` → exige `peticionId` + `usuarioId`
- `features/peticiones/schemas/firmar-peticion.schema.ts` → exige solo `peticionId`

`firmarPeticionAction` no llama a `.parse()` ni `.safeParse()` de ninguno de los dos. El `peticionId` llega a Prisma sin validar formato UUID; un valor malformado falla como error crudo de base de datos en vez de un error de validación limpio.

**Fix:** eliminar `features/firmas/schemas/firmar-peticion.schema.ts` (el `usuarioId` debe salir de la sesión, no del input — pedirlo como parámetro es además un vector de suplantación si alguna vez se usa mal). Conservar y **usar** el de `features/peticiones/schemas`.

### 1.5 `any` explícito en la capa de datos

```ts
// listar-peticiones-publicadas.ts y listar-noticias-publicadas.ts
export async function listarPeticionesPublicadas(...): Promise<PaginatedResult<any>>
```

```tsx
// app/peticiones/page.tsx y app/noticias/page.tsx
{peticiones.map((peticion: any) => ...)}
```

`tsconfig.json` tiene `"strict": true`; estos `any` lo anulan exactamente donde más importa: los datos que cruzan de la base de datos a la UI. Ver fix tipado en sección 6.4.

---

## 2. Riesgo arquitectónico: `"use server"` fuera de la capa Actions

| Carpeta                                       | ¿Tiene `"use server"`? | ¿Debería tenerlo?        |
| --------------------------------------------- | ---------------------- | ------------------------ |
| `features/*/actions/*.ts`                     | Sí                     | **Sí** — es su propósito |
| `features/categorias/repositories/*.ts`       | Sí (todas)             | No                       |
| `features/firmas/repositories/*.ts`           | Sí (todas)             | No                       |
| `features/noticias/repositories/*.ts`         | Sí (todas)             | No                       |
| `features/peticiones/repositories/*.ts`       | Sí (todas)             | No                       |
| `features/usuarios/repositories/*.ts`         | Sí (todas)             | No                       |
| `features/usuarios/services/*.ts`             | Sí (todas)             | No                       |
| `features/firmas/services/firmar-peticion.ts` | Sí                     | No                       |
| `features/categorias/services/*.ts`           | No                     | — (correcto)             |
| `features/noticias/services/*.ts`             | No                     | — (correcto)             |
| `features/peticiones/services/*.ts`           | No                     | — (correcto)             |

La inconsistencia entre features (`usuarios` marca sus services, el resto no) es la prueba de que la directiva se aplicó por costumbre ("esto corre en servidor, le pongo `use server`"), no por diseño deliberado.

**Por qué importa:** en Next.js, todo export `async` de un archivo con `"use server"` se convierte en un Server Action — un endpoint RPC invocable por su ID, sin pasar por tu `proxy.ts`/middleware de la forma en que pasaría una ruta normal, independientemente de si hoy solo lo llamas desde código de servidor. Eso significa que `obtenerUsuarioPorId`, `actualizarRolUsuario`, `listarUsuarios`, etc. son técnicamente invocables saltándose `verificarAdmin`/`cambiarRolUsuario` (la capa Service que sí valida permisos), si su referencia llega a aparecer en algún bundle de cliente.

Hoy probablemente no es explotable porque nada del lado cliente importa estos repositorios directamente. Pero es una trampa silenciosa: el día que alguien importe un repositorio desde un hook de cliente "porque es más directo", se abre el agujero sin que el diff lo deje ver.

**Fix — paquete `server-only`** (ya viene con Next.js, cero dependencias nuevas):

```ts
// repositories/obtener-usuario-por-id.ts
import "server-only";
import { prisma } from "@/lib/prisma";
// sin "use server"
export async function obtenerUsuarioPorId(id: string) {
  /* ... */
}
```

Esto garantiza en _build time_ que el archivo nunca se bundlea para cliente, sin convertirlo en un endpoint público. Reserva `"use server"` exclusivamente para `features/*/actions/*.ts`.

---

## 3. Duplicación de lógica (causa raíz de 1.1 y del riesgo de la sección 2)

| Lógica duplicada                                | Ubicaciones                                                                                                                                              | Consolidar en                                                           |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Verificación de admin (rol + estado)            | `categorias/services/verificar-admin.ts`, `usuarios/services/cambiar-estado-usuario.ts`, `usuarios/services/cambiar-rol-usuario.ts` (bloque idéntico x3) | `usuarios/services/verificar-admin.ts` único; los otros dos lo importan |
| Subida condicional a Cloudinary                 | `crear-noticia.ts`, `editar-noticia.ts` (x2), `crear-peticion.ts`, `editar-peticion.ts` (x2)                                                             | `lib/cloudinary.ts#subirImagenSiExiste` (sección 1.1)                   |
| Slugify                                         | `categorias/services/slugify.ts`, `noticias/services/slugify-noticia.ts`, `peticiones/services/slugify.ts`                                               | `lib/slugify.ts` único — ver nota abajo                                 |
| Preview + validación de imagen (tipo/tamaño)    | `use-crear-noticia-form.ts`, `use-editar-noticia-form.ts`, `use-crear-peticion-form.ts`, `use-editar-peticion-form.ts`, `editar-perfil-form.tsx`         | `hooks/use-image-upload-preview.ts`                                     |
| `startTransition` + toast en acciones admin     | `use-gestion-categorias.ts`, `use-gestion-noticias.ts`, `use-gestion-peticiones.ts`, `use-gestion-usuarios.ts`                                           | `hooks/use-server-action.ts` genérico                                   |
| Shape de `ActionState`                          | `peticiones/actions/action-state.ts`, `noticias/actions/noticia-action-state.ts`                                                                         | `types/form-action-state.ts` genérico parametrizado                     |
| `include` de Prisma (categoría + autor/usuario) | 4 repos de `noticias/`, 2 de `peticiones/`                                                                                                               | constante por feature (sección 6.4)                                     |

**Nota sobre slugify:** no son 3 copias idénticas — hay una diferencia de comportamiento real.

- `categorias/services/slugify.ts` usa `[^\w-]` (incluye `_`) y elimina explícitamente guiones al inicio/final.
- `peticiones/services/slugify.ts` y `noticias/services/slugify-noticia.ts` (idénticas entre sí) usan `[^a-z0-9 -]` y solo hacen `.trim()` (que limpia espacios, no guiones).

Resultado: un título terminado en un carácter especial puede dejar un slug con `-` colgando en peticiones/noticias, mientras que en categorías no. Antes de unificar, decide cuál es el comportamiento correcto — no es solo "elegir cualquiera de las 3".

---

## 4. Archivos sobredimensionados / multirresponsabilidad

| Archivo                                                                                                     | Problema                                                                                                                                                                                                                                                                                              | Split propuesto                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `components/account-access.tsx` (~280 líneas)                                                               | 6 componentes en un archivo: `AvatarCuenta`, `LoginButton`, `DesktopAccountAccess`, `MobileAccountAccess`, `MobileAnonymousAccess`, `AccountAccess`. Los 6 links del menú están hardcodeados dos veces (desktop/mobile) con markup distinto                                                           | `components/account-access/` con un archivo por componente + `account-menu-links.ts` con el array de links, mapeado por ambas variantes                                                                                        |
| `features/noticias/components/crear-noticia-form.tsx` (~290 líneas)                                         | `ImageUploader` con drag&drop completo embebido en el mismo archivo que el formulario. Bonus: `editar-noticia-form.tsx` usa un `<input type=file>` plano sin drag&drop ni botón de quitar — inconsistencia de UX entre crear/editar del mismo recurso que se resuelve gratis al extraer el componente | `components/image-uploader.tsx` reutilizado en ambos formularios                                                                                                                                                               |
| `features/peticiones/components/crear-peticion-form.tsx` + `editar-peticion-form.tsx` (~250-260 líneas c/u) | Campos título/categoría/imagen/meta_firmas/destacado casi idénticos copiados entre ambos                                                                                                                                                                                                              | `components/form/titulo-field.tsx`, `categoria-select-field.tsx`, `imagen-upload-field.tsx` compartidos; `meta_firmas`/`destacado` quedan donde están (son exclusivos de petición, no vale la pena atomizarlos más)            |
| `app/page.tsx` (~230 líneas)                                                                                | Hero, Stats, Peticiones, Noticias, CTA inline. Contradice la regla propia en `AGENTS.md` ("page.tsx... compone la página entregando props a los componentes hijos")                                                                                                                                   | `components/home/hero-section.tsx`, `stats-section.tsx`, `cta-section.tsx`                                                                                                                                                     |
| `app/peticiones/[slug]/page.tsx`                                                                            | Bloque "Estado de firmas" (barra de progreso + contador) construido inline en la página                                                                                                                                                                                                               | `features/peticiones/components/estado-firmas-peticion.tsx`                                                                                                                                                                    |
| `features/*/components/gestion-*.tsx` (categorías, noticias, peticiones)                                    | Tabla + diálogo de creación + diálogo de edición en un mismo archivo                                                                                                                                                                                                                                  | Separar en `*-table.tsx` + `crear-*-dialog.tsx` + `editar-*-dialog.tsx`. `mis-peticiones-table.tsx` ya hace esto bien (reutiliza `EditarPeticionForm` como componente separado) — replicar ese patrón en los 3 `gestion-*.tsx` |

---

## 5. Estructura de carpetas propuesta

```text
src/
├── hooks/                          # NUEVO — cross-cutting, no pertenece a ningún feature
│   ├── use-server-action.ts        # startTransition + toast genérico
│   └── use-image-upload-preview.ts # preview + validación tipo/tamaño
│
├── lib/
│   ├── slugify.ts                  # NUEVO — único, reemplaza las 3 copias
│   └── cloudinary.ts               # + subirImagenSiExiste()
│
├── components/
│   ├── account-access/             # NUEVO — reemplaza account-access.tsx
│   │   ├── index.tsx
│   │   ├── avatar-cuenta.tsx
│   │   ├── desktop-account-access.tsx
│   │   ├── mobile-account-access.tsx
│   │   ├── mobile-anonymous-access.tsx
│   │   └── account-menu-links.ts
│   ├── home/                       # NUEVO — extraído de app/page.tsx
│   │   ├── hero-section.tsx
│   │   ├── stats-section.tsx
│   │   └── cta-section.tsx
│   └── image-uploader.tsx          # NUEVO — extraído de crear-noticia-form.tsx
│
├── features/
│   ├── peticiones/components/form/ # NUEVO
│   │   ├── titulo-field.tsx
│   │   ├── categoria-select-field.tsx
│   │   └── imagen-upload-field.tsx
│   └── noticias/components/form/   # reutiliza los mismos campos genéricos si aplica
│
└── types/
    └── form-action-state.ts        # NUEVO — genérico, reemplaza action-state.ts + noticia-action-state.ts
```

---

## 6. Decisiones de diseño con trade-offs

### 6.1 Campos de formulario: ¿componente por campo o bloque único parametrizado?

**Opción A — un componente por campo**

- Máxima atomización, reutilizable entre petición/noticia para lo genérico (título, categoría, imagen)
- Testeable de forma aislada
- Más archivos, más imports por formulario

**Opción B — `<PeticionFormFields mode="crear" | "editar" .../>` único**

- Menos archivos
- La duplicación no desaparece, solo se mueve de "2 formularios" a "1 formulario con `if`s"

**Recomendación:** Opción A solo para lo realmente genérico (título, categoría, imagen). `meta_firmas` y `destacado` son exclusivos de petición — dejarlos donde están; atomizarlos no aporta reutilización real.

### 6.2 Hook genérico de acciones admin

```ts
// src/hooks/use-server-action.ts
import { useTransition } from "react";
import { toast } from "sonner";

export function useServerAction<TArgs extends unknown[], TResult>(
  action: (...args: TArgs) => Promise<TResult>,
  opts: {
    onSuccess?: (result: TResult) => { title: string; description?: string };
    onError?: (error: unknown) => { title: string; description?: string };
  },
) {
  const [isPending, startTransition] = useTransition();

  const run = (...args: TArgs) =>
    startTransition(async () => {
      try {
        const result = await action(...args);
        const msg = opts.onSuccess?.(result);
        if (msg) toast.success(msg.title, { description: msg.description });
      } catch (err) {
        const msg = opts.onError?.(err) ?? { title: "Error inesperado" };
        toast.error(msg.title, { description: msg.description });
      }
    });

  return { run, isPending };
}
```

Reemplaza el cuerpo de las 4 hooks `use-gestion-*` casi por completo; cada una queda reducida a su configuración específica (`onSuccess`/`onError`).

### 6.3 `verificarAdmin` — ¿dónde vive?

`categorias/services/verificar-admin.ts` ya importa de `usuarios/repositories/obtener-usuario-por-id`. Es lógica de autorización de **usuarios**, no de categorías — muévela a `usuarios/services/verificar-admin.ts` y haz que `categorias` (y las dos funciones de `usuarios` que la reimplementan) importen desde ahí.

### 6.4 Tipar los repos de listado sin reinventar tipos manuales

No crear interfaces manuales (tu propio `FILE_SCHEMA.md` ya lo prohíbe). Usar el `include` compartido + `Prisma.XGetPayload`, lo que además resuelve la duplicación de `include` de la sección 3:

```ts
// features/noticias/repositories/noticia-include.ts
import { Prisma } from "@/generated/prisma/client";

export const noticiaIncludeCompleto = {
  categoria: true,
  autor: { select: { id: true, nombre: true, picture: true } },
} satisfies Prisma.noticiaInclude;

export type NoticiaConRelaciones = Prisma.noticiaGetPayload<{
  include: typeof noticiaIncludeCompleto;
}>;
```

Reutilizable en `listar-noticias-publicadas.ts`, `listar-todas-las-noticias.ts`, `obtener-noticia-por-id.ts`, `obtener-noticia-por-slug.ts`. Mismo patrón para `peticiones`. Elimina los `any` de la sección 1.5 y la duplicación de `include` a la vez.

---

## 7. Inconsistencias menores (cosmético, bajo impacto)

| Inconsistencia                            | Evidencia                                                                                                                                                             | Fix                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Dos librerías de iconos                   | `components.json` declara `"iconLibrary": "hugeicons"`, `@hugeicons/*` está instalado, pero **ningún** componente revisado importa de ahí — todos usan `lucide-react` | Decidir una y desinstalar la otra (impacta bundle size)     |
| Import relativo vs alias                  | `lib/prisma.ts` usa `from "../generated/prisma/client"`; el resto del proyecto usa `@/generated/prisma/...`                                                           | Cambiar a alias por consistencia                            |
| `components/` vs `components/compartido/` | Sin criterio documentado de cuándo va cada cosa (`header.tsx`, `footer.tsx` en raíz; `barra-filtros.tsx`, `paginacion.tsx` en `compartido/`)                          | Documentar el criterio o fusionar en una sola carpeta plana |
