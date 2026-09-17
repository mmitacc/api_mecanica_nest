import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CrateDetalleDto } from './dto/createdetalle.dto.js';
import { UpdateDetalleDto } from './dto/updatedetalle.dto.js';

@Injectable()
export class DetalleServicioService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.detalleServicio.findMany();
  }
  async findOne(id: number) {
    const detalle = await this.prisma.detalleServicio.findUnique({
      where: { id },
    });
    if (!detalle) {
      throw new NotFoundException(`el detalle con id numero ${id} no exite`);
    }
    return detalle;
  }
  async create(CrateDetalleDto: CrateDetalleDto) {
    const respuesto = await this.prisma.repuesto.findUnique({
      where: { id: CrateDetalleDto.idRepuesto },
    });
    if (!respuesto) {
      throw new NotFoundException(
        `no se encontro el repuesto con id ${CrateDetalleDto.idRepuesto}`,
      );
    }
    const servicio = await this.prisma.ordenServicio.findUnique({
      where: { id: CrateDetalleDto.idOrdenServicio },
    });
    if (!servicio) {
      throw new NotFoundException(
        `no se encontro el la orden de servicio con id ${CrateDetalleDto.idOrdenServicio}`,
      );
    }
    const total = Number(respuesto.precio_unid) * CrateDetalleDto.cantidad;
    return await this.prisma.detalleServicio.create({
      data: {
        cantidad: CrateDetalleDto.cantidad,
        idOrdenServicio: CrateDetalleDto.idOrdenServicio,
        idRepuesto: CrateDetalleDto.idRepuesto,
        subTotal: total,
      },
    });
  }
  async update(id: number, UpdateDetalleDto: UpdateDetalleDto) {
    const detalle = await this.prisma.detalleServicio.findUnique({
      where: { id },
    });
    if (!detalle) {
      throw new NotFoundException(`el detalle con id numero ${id} no exite`);
    }
    const respuesto = await this.prisma.repuesto.findUnique({
      where: { id: detalle.idRepuesto },
    });
    if (!respuesto) {
      throw new NotFoundException(`no encontro el repuesto con id numero ${detalle.idRepuesto} no exite`);
    }
    const cantidad = UpdateDetalleDto.cantidad ?? detalle.cantidad
    const total = Number(respuesto.precio_unid) * cantidad
    return await this.prisma.detalleServicio.update({
      where: { id },
      data:{
        cantidad,
        subTotal: total
      },
    });
  }
  async remove(id: number) {
    const detalle = await this.prisma.detalleServicio.findUnique({
      where: { id },
    });
    if (!detalle) {
      throw new NotFoundException(`el detalle con id ${id} no se encontro`);
    }
    return await this.prisma.detalleServicio.delete({
      where: { id },
    });
  }
}
