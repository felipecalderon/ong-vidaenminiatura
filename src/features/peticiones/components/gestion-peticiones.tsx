"use client";

import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import type { PeticionConRelaciones } from "../types";
import { PeticionesTable } from "./peticiones-table";

interface GestionPeticionesProps {
  peticiones: PeticionConRelaciones[];
  categorias: { id: string; nombre: string }[];
}

export function GestionPeticiones({
  peticiones,
  categorias,
}: GestionPeticionesProps) {
  return (
    <div className="space-y-4">
      <AdminHeader title="Gestión de Peticiones">
        <Button
          asChild
          variant="outline"
          className="border border-outline-variant"
        >
          <Link href="/peticiones/crear">Nueva petición</Link>
        </Button>
      </AdminHeader>

      <PeticionesTable
        peticiones={peticiones}
        categorias={categorias}
        esAdmin
        emptyCtaHref="/peticiones/crear"
        emptyCtaLabel="Crear Nueva Petición"
      />
    </div>
  );
}
