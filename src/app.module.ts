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

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'first-app',
    }),
    PrismaModule,
    ClientesModule,
    DetalleServicioModule,
    OrdenServicioModule,
    UsuarioModule,
    VehiculosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
