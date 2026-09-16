import { Global, Module } from '@nestjs/common';
import { DetalleServicioService } from './detalle_servicio.service.js';
import { DetalleServicioController } from './detalle_servicio.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Global() 
@Module({
  providers: [DetalleServicioService],
  controllers: [DetalleServicioController],
  imports: [PrismaModule]
})
export class DetalleServicioModule {}
