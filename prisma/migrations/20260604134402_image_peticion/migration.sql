-- AlterTable
ALTER TABLE "noticia" ADD COLUMN     "imagen" TEXT;

-- AlterTable
ALTER TABLE "peticion" ADD COLUMN     "imagen" TEXT,
ADD COLUMN     "meta_firmas" INTEGER NOT NULL DEFAULT 1000;
