import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ClientesModule } from './clientes/clientes.module.js';
import { DetalleServicioModule } from './detalle_servicio/detalle_servicio.module.js';
import { OrdenServicioModule } from './orden-servicio/orden-servicio.module.js';
import { UsuarioModule } from './usuario/usuario.module.js';
import { VehiculosModule } from './vehiculos/vehiculos.module.js';
import { RepuestosModule } from './repuestos/repuestos.module.js';
import { AuthModule } from './auth/auth.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [

    PrismaModule,
    ClientesModule,
    DetalleServicioModule,
    OrdenServicioModule,
    UsuarioModule,
    VehiculosModule,
    RepuestosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
