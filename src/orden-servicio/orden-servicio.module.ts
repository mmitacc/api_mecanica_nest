import { Module } from '@nestjs/common';
import { OrdenServicioController } from './orden-servicio.controller.js';
import { OrdenService } from './orden-servicio.service.js';

@Module({
  controllers: [OrdenServicioController],
  providers: [OrdenService]
})
export class OrdenServicioModule {}
