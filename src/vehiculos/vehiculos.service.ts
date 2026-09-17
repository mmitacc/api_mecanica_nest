import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto.js';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto.js';

@Injectable()
export class VehiculosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVehiculoDto: CreateVehiculoDto) {
    return await this.prisma.vehiculo.create({
      data: createVehiculoDto,
      include: {
        clientes: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.vehiculo.findMany({
      include: {
        clientes: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const vehiculo = await this.prisma.vehiculo.findUnique({
      where: {
        id,
      },
      include: {
        clientes: true,
      },
    });

    if (!vehiculo) {
      throw new NotFoundException(
        `Vehículo de ID: ${id} no encontrado`,
      );
    }

    return vehiculo;
  }

  async update(id: number, updateVehiculoDto: UpdateVehiculoDto) {
    return await this.prisma.vehiculo.update({
      where: {
        id,
      },
      data: updateVehiculoDto,
      include: {
        clientes: true,
      },
    });
  }

  async remove(id: number) {
    const vehiculo = await this.prisma.vehiculo.findUnique({
      where: {
        id,
      },
    });

    if (!vehiculo) {
      throw new NotFoundException(
        `Vehículo de ID: ${id} no encontrado`,
      );
    }

    return await this.prisma.vehiculo.delete({
      where: {
        id,
      },
    });
  }
}