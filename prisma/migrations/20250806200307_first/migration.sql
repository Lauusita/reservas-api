-- CreateEnum
CREATE TYPE "public"."EstadoValidacion" AS ENUM ('PENDIENTE', 'VALIDADA', 'RECHAZADA');

-- CreateTable
CREATE TABLE "public"."Reserva" (
    "id" TEXT NOT NULL,
    "nombreCompleto" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "documentoIdentidad" TEXT,
    "fechaReserva" DATE NOT NULL,
    "horaReserva" TIME NOT NULL,
    "cantidadPersonas" INTEGER NOT NULL,
    "volantePagoUrl" TEXT NOT NULL,
    "estadoValidacion" "public"."EstadoValidacion" NOT NULL DEFAULT 'PENDIENTE',
    "observaciones" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);
