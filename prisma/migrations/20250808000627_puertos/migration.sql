/*
  Warnings:

  - Added the required column `puertoDestino` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `puertoOrigen` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Puerto" AS ENUM ('LETICIA', 'RONDA', 'MILAGROSA', 'ONVACATION', 'CANAN', 'SAN_JOSE', 'NAZARETH', 'PUERTO_ALEGRIA', 'ARARA', 'ISLA_MICOS', 'SANTA_SOFIA', 'LOMALINDA', 'PRIMAVERA', 'TRIUNFO', 'LIBERTAD', 'ZARAGOZA', 'NATURAPARK', 'VERGEL', 'MACEDONIA', 'CALANOA', 'MOCAGUA', 'PALMERAS', 'BOCAS_AMACAYACU', 'VALENCIA', 'SAN_ANTONIO', 'PUERTO_ESPERANZA', 'VEINTE_DE_JULIO', 'PUERTO_NARINO', 'CABALLO_COCHA');

-- AlterTable
ALTER TABLE "public"."Reserva" ADD COLUMN     "puertoDestino" "public"."Puerto" NOT NULL,
ADD COLUMN     "puertoOrigen" "public"."Puerto" NOT NULL;
