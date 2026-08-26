-- CreateEnum
CREATE TYPE "TipoPublicacion" AS ENUM ('ESTUDIO', 'PUBLICACION', 'EVENTO');

-- CreateEnum
CREATE TYPE "EstadoPublicacion" AS ENUM ('BORRADOR', 'REVISION', 'PUBLICADA', 'ARCHIVADA');

-- CreateTable
CREATE TABLE "publicacion" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "imagen" TEXT,
    "tipo" "TipoPublicacion" NOT NULL,
    "autores" TEXT[],
    "anio" INTEGER,
    "enlace" TEXT,
    "lugar" TEXT,
    "fecha_evento" TIMESTAMP(3),
    "estado" "EstadoPublicacion" NOT NULL DEFAULT 'BORRADOR',
    "autor_id" UUID NOT NULL,
    "fecha_publicacion" TIMESTAMP(3),
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publicacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "publicacion_slug_key" ON "publicacion"("slug");

-- CreateIndex
CREATE INDEX "publicacion_estado_fecha_publicacion_idx" ON "publicacion"("estado", "fecha_publicacion");

-- CreateIndex
CREATE INDEX "publicacion_tipo_idx" ON "publicacion"("tipo");

-- CreateIndex
CREATE INDEX "publicacion_autor_id_idx" ON "publicacion"("autor_id");

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
