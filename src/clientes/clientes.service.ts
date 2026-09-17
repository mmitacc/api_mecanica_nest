import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.cliente.findMany();
  }

  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente no encontrado`);
    }

    return cliente;
  }

  async create(createClienteDto: CreateClienteDto) {
    return await this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    return await this.prisma.cliente.update({
      where: { id },
      data: updateClienteDto,
    });
  }
}
