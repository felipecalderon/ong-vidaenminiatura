<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Reglas estrictas

## Arquitectura

- Preferir **Server Components** por defecto. Utilizar `"use client"` únicamente cuando sea necesario para interacción o estado del navegador.
- `page.tsx` coordina la carga inicial de datos y compone la página pasando props a componentes hijos.
- Los componentes React son exclusivamente de **presentación e interacción**. No contienen lógica de negocio ni acceden directamente a MongoDB, Resend u otros servicios externos.
- Toda la lógica de negocio debe vivir en `Services`.
- Las consultas se realizan desde **Server Components** mediante `Queries` y/o `Repositories`.
- Las mutaciones se realizan mediante **Server Actions**. Los Client Components pueden invocarlas mediante `useTransition` cuando necesiten gestionar estado `pending`.
- Jamás utilizar `useEffect` + `fetch` para obtener datos iniciales cuando puedan utilizarse Server Components.
- Mantener los Client Components pequeños y atomizados.
- Mantener las funcionalidades de Client Components en custom hooks.

## Organización del código

- Mantener constantes, tipos y funciones utilitarias fuera de los componentes y organizados según su responsabilidad.
- Evitar abstracciones innecesarias y mantener una arquitectura simple y consistente.
- No duplicar lógica de negocio entre Actions, Services, Queries o componentes.

## Validaciones

**No ejecutar `build`, `lint` ni procesos equivalentes automáticamente.** Se ejecutarán manualmente al finalizar cada hito.
**Búsqueda de archivos, carpetas y navegación: Utilizar skill de codegraph**

<!-- END:nextjs-agent-rules -->
