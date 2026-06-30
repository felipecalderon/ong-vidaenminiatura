# Planificación Técnica

## Objetivo del MVP

Construir una plataforma compuesta por dos dominios principales:

### Plataforma de Peticiones

Permite:

- Crear peticiones.
- Editar peticiones.
- Publicar peticiones.
- Firmar peticiones.
- Consultar peticiones públicas.

---

### Plataforma Editorial

Permite:

- Crear artículos.
- Editar artículos.
- Publicar artículos.
- Navegar artículos por categoría.
- Mostrar perfil del autor.

---

### Administración

Permite:

- Gestionar usuarios.
- Gestionar categorías.
- Gestionar peticiones.
- Gestionar noticias.
- Gestionar roles.

---

# Stack Tecnológico

## Frontend

```text
Next.js 16+
React 19+
TypeScript
```

---

## Base de Datos

```text
PostgreSQL
Prisma ORM
```

Hosting inicial:

```text
Railway
```

---

## Autenticación

```text
Auth0
```

Responsabilidades:

```text
Login
Logout
Registro
Recuperación de contraseña
Gestión de sesión
```

No se almacenan contraseñas localmente.

---

## UI

```text
shadcn/ui
```

---

## Formularios

```text
react-hook-form
zod
```

---

## Markdown

Editor:

```text
MDXEditor
```

Abstraído mediante:

```text
components/markdown/
├── MarkdownEditor
└── MarkdownRenderer
```

Nunca usar directamente MDXEditor fuera de estos wrappers.

---

# Filosofía Arquitectónica

## Server First

Prioridad:

```text
Server Components
↓
Server Actions
↓
Client Components
```

---

## Evitar API Routes internas

Para operaciones propias de la aplicación:

```text
Crear petición
Editar noticia
Firmar petición
Actualizar perfil
```

Utilizar:

```text
Server Actions
```

---

## Arquitectura por capas

```text
Page
↓
Server Action
↓
Service
↓
Repository
↓
Prisma
↓
PostgreSQL
```

---

# Estructura del Proyecto

```text
src/
│
├── app/
├── components/
├── features/
├── actions/
├── generated/
├── types/
└── middleware.ts
```

---

# App Router

```text
app/
│
├── page.tsx
│
├── peticiones/
│   ├── page.tsx
│   ├── nueva/
│   └── [slug]/
│
├── noticias/
│   ├── page.tsx
│   ├── nueva/
│   └── [slug]/
│
├── categorias/
│   └── [slug]/
│
├── perfil/
│
├── administracion/
│
└── auth/
```

---

# Organización por Features

```text
features/
│
├── autenticacion/
├── usuarios/
├── categorias/
├── peticiones/
├── firmas/
└── noticias/
```

Ejemplo:

```text
peticiones/
│
├── actions/
├── components/
├── queries/
├── schemas/
├── services/
└── types/
```

---

# Persistencia

## Repositories

Encapsulan Prisma.

Ejemplos:

```ts
obtenerPeticionPorSlug();
crearPeticion();
listarPeticionesPublicadas();

obtenerNoticiaPorSlug();
crearNoticia();
```

---

## Services

Contienen reglas de negocio.

Ejemplo:

```ts
firmarPeticion();
```

Valida:

```text
Usuario existe
Petición existe
Petición publicada
Usuario no ha firmado previamente
```

---

# Gestión de Usuarios

## JIT Provisioning

Primer login:

```text
Usuario
↓
Auth0
↓
Callback
↓
Buscar auth0Id
```

Si no existe:

```text
Crear usuario local
```

con:

```text
auth0Id
email
nombre
rol=USUARIO
```

---

# Roles

## Enum Rol

```text
USUARIO
AUTOR
ADMINISTRADOR
```

---

## Permisos

### Usuario

```text
Crear noticias (en revisión)
Crear peticiones
Firmar peticiones
Gestionar perfil
```

---

### Autor

```text
Crear noticias
Crear peticiones
Firmar peticiones
Editar noticias propias
Publicar noticias propias
```

---

### Administrador

```text
Gestionar usuarios
Gestionar categorías
Gestionar noticias
Gestionar peticiones
Asignar roles
```

---

# Modelo de Dominio

## Usuario

Responsable de:

```text
Crear peticiones
Crear noticias
Firmar peticiones
```

---

## Categoría

Utilizada por:

```text
Noticias
Peticiones
```

---

## Petición

Campos conceptuales:

```text
Título
Slug
Resumen
Contenido Markdown
Estado
Categoría
Autor
CantidadFirmas
```

---

## Firma

Representa:

```text
Usuario firma una petición
```

Restricción:

```text
Un usuario solo puede firmar una vez cada petición
```

---

## Noticia

Campos conceptuales:

```text
Título
Slug
Resumen
Contenido Markdown
Estado
Categoría
Autor
FechaPublicación
```

---

# Estados

## EstadoPeticion

```text
BORRADOR
REVISION
PUBLICADA
CERRADA
ARCHIVADA
```

---

## EstadoNoticia

```text
BORRADOR
REVISION
PUBLICADA
ARCHIVADA
```

---

# Server Actions

## Peticiones

```text
crearPeticion
editarPeticion
publicarPeticion
cerrarPeticion
archivarPeticion
```

---

## Firmas

```text
firmarPeticion
```

---

## Noticias

```text
crearNoticia
editarNoticia
publicarNoticia
archivarNoticia
```

---

## Categorías

```text
crearCategoria
editarCategoria
desactivarCategoria
```

---

## Usuarios

```text
actualizarRol
activarUsuario
desactivarUsuario
```

---

# Validación

Todo input pasa por Zod.

Ejemplo:

```ts
const crearPeticionSchema = z.object({
  titulo: z.string().min(10).max(200),
  resumen: z.string().min(50).max(500),
  contenido: z.string().min(100),
  categoriaId: z.string().uuid(),
});
```

---

# Slugs

Persistidos en base de datos.

Ejemplos:

```text
/peticiones/salvemos-el-humedal
/noticias/entrevista-a-isabel-allende
```

Restricciones:

```text
UNIQUE
INDEX
```

No generarlos dinámicamente en cada request.

---

# SEO

Todas las páginas públicas utilizan:

```ts
generateMetadata();
```

Rutas SEO:

```text
/noticias/[slug]
/peticiones/[slug]
/categorias/[slug]
```

---

# Caché

Utilizar únicamente mecanismos nativos de Next.js.

```ts
revalidatePath();
revalidateTag();
```

No introducir:

```text
Redis
Memcached
```

en la V1.

---

# Estado Global

No incorporar Zustand inicialmente.

Utilizar:

```text
Server Components
Props
Local State
```

Introducir una librería global únicamente cuando exista una necesidad concreta.

---

# Fases de Desarrollo

## Fase 1

Infraestructura.

```text
Next.js
Auth0
Prisma
PostgreSQL
shadcn/ui
```

---

## Fase 2

Usuarios.

```text
Login
Perfil
Roles
```

---

## Fase 3

Categorías.

```text
CRUD
Listado
Asignación
```

---

## Fase 4

Peticiones.

```text
Crear
Editar
Publicar
Visualizar
```

---

## Fase 5

Firmas.

```text
Firmar
Contabilizar
Validar duplicados
```

---

## Fase 6

Noticias.

```text
Crear
Editar
Publicar
Categorizar
```

---

## Fase 7

Administración.

```text
Usuarios
Roles
Noticias
Peticiones
Categorías
```
