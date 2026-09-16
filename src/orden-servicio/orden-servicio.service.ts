import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto.js';
import { UpdateOrdenDto } from './dto/update-orden.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';


@Injectable()
export class OrdenService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrdenDto: CreateOrdenDto) {
    try {
      return await this.prisma.ordenServicio.create({
        data: createOrdenDto,
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return this.prisma.ordenServicio.findMany({
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.ordenServicio.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`Orden de ID: ${id} no encontrado`);
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, UpdateOrdenDto: UpdateOrdenDto) {
    try {
      return await this.prisma.ordenServicio.update({
        where: { id },
        data: UpdateOrdenDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.ordenServicio.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`Orden de ID: ${id} no encontrado`);
      }
      return await this.prisma.ordenServicio.delete({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }
}