<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Reglas estrictas

**Toda la lógica de negocio ocurre en Services. Las consultas se realizan desde Server Components mediante Repositories o Queries. Las mutaciones se realizan mediante Server Actions. Los componentes React sólo presentan datos y capturan interacción del usuario. page.tsx coordina la carga inicial de datos y compone la página entregando props a los componentes hijos**

**Jamas hacer build ni lint, se hará siempre manualmente al final de cada hito**

<!-- END:nextjs-agent-rules -->
