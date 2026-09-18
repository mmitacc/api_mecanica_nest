import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto.js';
import { UpdateOrdenDto } from './dto/update-orden.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import { inputFechas } from './dto/reporte-orden.dto.js';

@Injectable()
export class OrdenService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrdenDto: CreateOrdenDto) {
    return await this.prisma.ordenServicio.create({
      data: createOrdenDto,
    });
  }

  async findAll() {
    return this.prisma.ordenServicio.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.ordenServicio.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Orden de ID: ${id} no encontrado`);
    }
    return user;
  }
  async findbyMech(idUsuario: number) {
    const user = await this.prisma.ordenServicio.findMany({
      where: { idUsuario },
    });
    if (!user) {
      throw new NotFoundException(`Orden de ID: ${idUsuario} no encontrado`);
    }
    return user;
  }
  async update(id: number, UpdateOrdenDto: UpdateOrdenDto) {
    return await this.prisma.ordenServicio.update({
      where: { id },
      data: UpdateOrdenDto,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.ordenServicio.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`Orden de ID: ${id} no encontrado`);
    }
    return await this.prisma.ordenServicio.delete({
      where: { id },
    });
  }

  async getReporte(fechas: inputFechas) {
    const where: Prisma.OrdenServicioWhereInput = {
      fechacreacion: {
        gte: new Date(fechas.minFecha).toISOString(),
        lt: new Date(fechas.maxFecha).toISOString(),
      },
      estado: {
        equals: 'LISTO',
      },
    };

    const [ordenes, totales] = await Promise.all([
      this.prisma.ordenServicio.findMany({
        where,
      }),

      this.prisma.ordenServicio.aggregate({
        where,
        _sum: {
          total: true,
          costomecanico: true,
        },
      }),
    ]);

    return {
      ordenes,
      totalGeneral: totales._sum.total ?? 0,
      totalCostoMecanico: totales._sum.costomecanico ?? 0,
    };
  }
}
