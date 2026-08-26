-- CreateEnum
CREATE TYPE "TipoRecursoEducativo" AS ENUM ('CONCEPTO', 'GUIA', 'PREGUNTA', 'ACCION');

-- CreateEnum
CREATE TYPE "EstadoRecursoEducativo" AS ENUM ('BORRADOR', 'REVISION', 'PUBLICADA', 'ARCHIVADA');

-- CreateTable
CREATE TABLE "recursoEducativo" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "imagen" TEXT,
    "tipo" "TipoRecursoEducativo" NOT NULL,
    "categoria_id" UUID,
    "estado" "EstadoRecursoEducativo" NOT NULL DEFAULT 'BORRADOR',
    "autor_id" UUID NOT NULL,
    "fecha_publicacion" TIMESTAMP(3),
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recursoEducativo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recursoEducativo_slug_key" ON "recursoEducativo"("slug");

-- CreateIndex
CREATE INDEX "recursoEducativo_estado_fecha_publicacion_idx" ON "recursoEducativo"("estado", "fecha_publicacion");

-- CreateIndex
CREATE INDEX "recursoEducativo_tipo_idx" ON "recursoEducativo"("tipo");

-- CreateIndex
CREATE INDEX "recursoEducativo_autor_id_idx" ON "recursoEducativo"("autor_id");

-- AddForeignKey
ALTER TABLE "recursoEducativo" ADD CONSTRAINT "recursoEducativo_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recursoEducativo" ADD CONSTRAINT "recursoEducativo_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
