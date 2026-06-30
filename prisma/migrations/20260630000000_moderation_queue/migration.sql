-- Manual migration: Add REVISION value to EstadoPeticion and EstadoNoticia enums
-- 
-- IMPORTANT: In PostgreSQL, ALTER TYPE ... ADD VALUE cannot run inside a transaction.
-- Run this migration manually with:
--   prisma migrate resolve --applied 20260630000000_moderation_queue
-- After executing this SQL file directly against the database.
--
-- Or run via psql:
--   psql $DATABASE_URL -f prisma/migrations/20260630000000_moderation_queue/migration.sql

ALTER TYPE "EstadoPeticion" ADD VALUE IF NOT EXISTS 'REVISION' AFTER 'BORRADOR';
ALTER TYPE "EstadoNoticia" ADD VALUE IF NOT EXISTS 'REVISION' AFTER 'BORRADOR';
