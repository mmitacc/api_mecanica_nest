import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRepuestoDto } from './dto/create-repuesto.dto.js';
import { UpdateRepuestoDto } from './dto/update-repuesto.dto.js';

@Injectable()
export class RepuestosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRepuestoDto: CreateRepuestoDto) {
    return await this.prisma.repuesto.create({
      data: createRepuestoDto,
    });
  }

  async findAll() {
    return await this.prisma.repuesto.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const repuesto = await this.prisma.repuesto.findUnique({
      where: { id },
    });

    if (!repuesto) {
      throw new NotFoundException(`Repuesto de ID: ${id} no encontrado`);
    }

    return repuesto;
  }

  async update(id: number, updateRepuestoDto: UpdateRepuestoDto) {
    return await this.prisma.repuesto.update({
      where: { id },
      data: updateRepuestoDto,
    });
  }

  async remove(id: number) {
    const repuesto = await this.prisma.repuesto.findUnique({
      where: { id },
    });

    if (!repuesto) {
      throw new NotFoundException(`Repuesto de ID: ${id} no encontrado`);
    }

    return await this.prisma.repuesto.delete({
      where: { id },
    });
  }
}