import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const categoriasIniciales = [
  {
    nombre: "Derecho Animal y Legislación",
    slug: "derecho-animal-legislacion",
    descripcion: "Reformas legales, fallos judiciales, campañas normativas",
    color: "#7c3aed",
  },
  {
    nombre: "Conservación y Hábitat",
    slug: "conservacion-habitat",
    descripcion: "Ecosistemas, deforestación, especies y sus hábitats en riesgo",
    color: "#16a34a",
  },
  {
    nombre: "Bienestar Animal",
    slug: "bienestar-animal",
    descripcion: "Maltrato, rescate, condiciones de vida — no legal, no ecosistémico",
    color: "#db2777",
  },
  {
    nombre: "Educación y Divulgación",
    slug: "educacion-divulgacion",
    descripcion: "Contenido pedagógico, mitos, guías de identificación",
    color: "#0ea5e9",
  },
  {
    nombre: "Investigación y Ciencia",
    slug: "investigacion-ciencia",
    descripcion: "Estudios, hallazgos, datos duros",
    color: "#6366f1",
  },
  {
    nombre: "Comunidad y Participación",
    slug: "comunidad-participacion",
    descripcion: "Voluntariado, eventos, avances de campañas, llamados a la acción",
    color: "#eab308",
  },
  {
    nombre: "Institucional",
    slug: "institucional",
    descripcion: "Anuncios de la fundación: alianzas, hitos, equipo",
    color: "#6b7280",
  },
] as const;

async function main(): Promise<void> {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  const prisma = new PrismaClient({ adapter });

  try {
    for (const categoria of categoriasIniciales) {
      const resultado = await prisma.categoria.upsert({
        where: { slug: categoria.slug },
        update: {
          nombre: categoria.nombre,
          descripcion: categoria.descripcion,
          color: categoria.color,
        },
        create: {
          nombre: categoria.nombre,
          slug: categoria.slug,
          descripcion: categoria.descripcion,
          color: categoria.color,
          activo: true,
        },
      });

      console.log(`✓ ${resultado.nombre} (${resultado.slug})`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
