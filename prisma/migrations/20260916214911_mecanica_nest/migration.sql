/*
  Warnings:

  - You are about to drop the column `idOrdenServicio` on the `detalle_servicio` table. All the data in the column will be lost.
  - You are about to drop the column `idRepuesto` on the `detalle_servicio` table. All the data in the column will be lost.
  - You are about to drop the column `subTotal` on the `detalle_servicio` table. All the data in the column will be lost.
  - Added the required column `id_ordenservicio` to the `detalle_servicio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_repuesto` to the `detalle_servicio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "detalle_servicio" DROP CONSTRAINT "detalle_servicio_idOrdenServicio_fkey";

-- DropForeignKey
ALTER TABLE "detalle_servicio" DROP CONSTRAINT "detalle_servicio_idRepuesto_fkey";

-- AlterTable
ALTER TABLE "detalle_servicio" DROP COLUMN "idOrdenServicio",
DROP COLUMN "idRepuesto",
DROP COLUMN "subTotal",
ADD COLUMN     "id_ordenservicio" INTEGER NOT NULL,
ADD COLUMN     "id_repuesto" INTEGER NOT NULL,
ADD COLUMN     "subtotal" DECIMAL(65,30) NOT NULL DEFAULT 0.0;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_id_ordenservicio_fkey" FOREIGN KEY ("id_ordenservicio") REFERENCES "orden_servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_servicio" ADD CONSTRAINT "detalle_servicio_id_repuesto_fkey" FOREIGN KEY ("id_repuesto") REFERENCES "repuesto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
