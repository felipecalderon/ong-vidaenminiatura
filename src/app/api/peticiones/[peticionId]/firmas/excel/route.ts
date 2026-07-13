import { type NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { listarFirmasPorPeticion } from "@/features/firmas/repositories/listar-firmas-por-peticion";
import { obtenerPeticionPorId } from "@/features/peticiones/repositories/obtener-peticion-por-id";
import { obtenerUsuarioAutenticado } from "@/features/usuarios/queries/obtener-usuario-autenticado";

export const runtime = "nodejs";

function sanitizarNombreArchivo(valor: string) {
  return valor
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 50);
}

export async function generateExcel(
  _request: NextRequest,
  { params }: { params: Promise<{ peticionId: string }> },
) {
  const usuario = await obtenerUsuarioAutenticado();

  if (!usuario?.acceso.esAdministrador) {
    return new NextResponse("No autorizado.", { status: 403 });
  }

  const { peticionId } = await params;
  const peticion = await obtenerPeticionPorId(peticionId);

  if (!peticion) {
    return new NextResponse("La petición no existe.", { status: 404 });
  }

  const firmas = await listarFirmasPorPeticion(peticionId);

  if (firmas.length === 0) {
    return new NextResponse("Esta petición no tiene firmas registradas.", {
      status: 400,
    });
  }

  const filas = firmas.map((firma, index) => ({
    "#": index + 1,
    Nombre: firma.usuario.nombre,
    Correo: firma.usuario.correo,
    "Fecha de firma": new Date(firma.fecha_creacion).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const hoja = XLSX.utils.json_to_sheet(filas);
  hoja["!cols"] = [{ wch: 5 }, { wch: 35 }, { wch: 40 }, { wch: 22 }];

  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Firmas");

  const buffer = XLSX.write(libro, {
    bookType: "xlsx",
    type: "buffer",
  }) as Buffer;

  const nombreArchivo = `firmas_${sanitizarNombreArchivo(peticion.titulo)}.xlsx`;

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${nombreArchivo}"`,
      "Cache-Control": "no-store",
    },
  });
}

export { generateExcel as GET };
