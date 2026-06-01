-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('USUARIO', 'AUTOR', 'ADMINISTRADOR');

-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'SUSPENDIDO');

-- CreateEnum
CREATE TYPE "EstadoPeticion" AS ENUM ('BORRADOR', 'PUBLICADA', 'CERRADA', 'ARCHIVADA');

-- CreateEnum
CREATE TYPE "EstadoNoticia" AS ENUM ('BORRADOR', 'PUBLICADA', 'ARCHIVADA');

-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL,
    "auth0_id" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "nickname" TEXT,
    "given_name" TEXT,
    "family_name" TEXT,
    "picture" TEXT,
    "email_verified" BOOLEAN,
    "rol" "Rol" NOT NULL DEFAULT 'USUARIO',
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descripcion" TEXT,
    "color" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peticion" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "estado" "EstadoPeticion" NOT NULL DEFAULT 'BORRADOR',
    "cantidad_firmas" INTEGER NOT NULL DEFAULT 0,
    "categoria_id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "fecha_publicacion" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "peticion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "firma" (
    "id" UUID NOT NULL,
    "usuario_id" UUID NOT NULL,
    "peticion_id" UUID NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "firma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticia" (
    "id" UUID NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "estado" "EstadoNoticia" NOT NULL DEFAULT 'BORRADOR',
    "categoria_id" UUID NOT NULL,
    "autor_id" UUID NOT NULL,
    "fecha_publicacion" TIMESTAMP(3),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "noticia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_auth0_id_key" ON "usuario"("auth0_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");

-- CreateIndex
CREATE INDEX "usuario_rol_idx" ON "usuario"("rol");

-- CreateIndex
CREATE INDEX "usuario_estado_idx" ON "usuario"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nombre_key" ON "categoria"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_slug_key" ON "categoria"("slug");

-- CreateIndex
CREATE INDEX "categoria_activo_idx" ON "categoria"("activo");

-- CreateIndex
CREATE UNIQUE INDEX "peticion_slug_key" ON "peticion"("slug");

-- CreateIndex
CREATE INDEX "peticion_estado_fecha_publicacion_idx" ON "peticion"("estado", "fecha_publicacion");

-- CreateIndex
CREATE INDEX "peticion_categoria_id_idx" ON "peticion"("categoria_id");

-- CreateIndex
CREATE INDEX "peticion_usuario_id_idx" ON "peticion"("usuario_id");

-- CreateIndex
CREATE INDEX "peticion_usuario_id_fecha_creacion_idx" ON "peticion"("usuario_id", "fecha_creacion");

-- CreateIndex
CREATE INDEX "peticion_cantidad_firmas_idx" ON "peticion"("cantidad_firmas");

-- CreateIndex
CREATE INDEX "firma_usuario_id_idx" ON "firma"("usuario_id");

-- CreateIndex
CREATE INDEX "firma_peticion_id_idx" ON "firma"("peticion_id");

-- CreateIndex
CREATE UNIQUE INDEX "firma_usuario_id_peticion_id_key" ON "firma"("usuario_id", "peticion_id");

-- CreateIndex
CREATE UNIQUE INDEX "noticia_slug_key" ON "noticia"("slug");

-- CreateIndex
CREATE INDEX "noticia_estado_fecha_publicacion_idx" ON "noticia"("estado", "fecha_publicacion");

-- CreateIndex
CREATE INDEX "noticia_categoria_id_idx" ON "noticia"("categoria_id");

-- CreateIndex
CREATE INDEX "noticia_autor_id_idx" ON "noticia"("autor_id");

-- CreateIndex
CREATE INDEX "noticia_autor_id_fecha_creacion_idx" ON "noticia"("autor_id", "fecha_creacion");

-- AddForeignKey
ALTER TABLE "peticion" ADD CONSTRAINT "peticion_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peticion" ADD CONSTRAINT "peticion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "firma" ADD CONSTRAINT "firma_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "firma" ADD CONSTRAINT "firma_peticion_id_fkey" FOREIGN KEY ("peticion_id") REFERENCES "peticion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noticia" ADD CONSTRAINT "noticia_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noticia" ADD CONSTRAINT "noticia_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
