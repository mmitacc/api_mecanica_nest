-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MECANICO', 'RECEPCIONISTA', 'DUEÑO');

-- CreateEnum
CREATE TYPE "EstadoServicio" AS ENUM ('RECEPCIONADO', 'EN_REPARACION', 'LISTO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'RECEPCIONISTA',
    "fechacreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orden_servicio" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "costomecanico" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "estado" "EstadoServicio" NOT NULL DEFAULT 'RECEPCIONADO',
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "id_usuario" INTEGER NOT NULL,
    "id_vehiculo" INTEGER NOT NULL,
    "fechacreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orden_servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehiculo" (
    "id" SERIAL NOT NULL,
    "placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "fechacreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vehiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_servicio" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "subtotal" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "fechacreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_ordenservicio" INTEGER NOT NULL,
    "id_repuesto" INTEGER NOT NULL,

    CONSTRAINT "detalle_servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repuesto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio_unid" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "fechacreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repuesto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fechacreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_email_key" ON "cliente"("email");

-- AddForeignKey
ALTER TABLE "orden_servicio" ADD CONSTRAINT "orden_servicio_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_servicio" ADD CONSTRAINT "orden_servicio_id_vehiculo_fkey" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehiculo" ADD CONSTRAINT "vehiculo_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_id_ordenservicio_fkey" FOREIGN KEY ("id_ordenservicio") REFERENCES "orden_servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_id_repuesto_fkey" FOREIGN KEY ("id_repuesto") REFERENCES "repuesto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
