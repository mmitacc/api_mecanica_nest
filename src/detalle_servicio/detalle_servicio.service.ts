import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CrateDetalleDto } from './dto/createdetalle.dto.js';
import { UpdateDetalleDto } from './dto/updatedetalle.dto.js';

@Injectable()
export class DetalleServicioService {
    constructor(private readonly prisma:PrismaService){}
    async findAll(){
        try {
            return this.prisma.detalleServicio.findMany()
        } catch (error) {
            return (`hubo un problema a al traer la tabla de destalles`)
        }
    }
    async findOne(id:number){
        try {
            const detalle = await this.prisma.detalleServicio.findUnique({
                where: {id}
            })
            if(!detalle){
                throw new NotFoundException(`el detalle con id numero ${id} no exite`)
            }
            return detalle
        } catch (error) {
            return (`hubo un problema al intentar acceder a la tabla detalles`)
        }
    }
    async create(CrateDetalleDto: CrateDetalleDto){
        try {
            const respuesto = await this.prisma.repuesto.findUnique({
                where: {id: CrateDetalleDto.idRepuesto}
            })
            if(!respuesto){
                throw new NotFoundException(`no se encontro el repuesto con id ${CrateDetalleDto.idRepuesto}`)
            }
            const total =Number(respuesto.precio_unid) * CrateDetalleDto.cantidad
            return await this.prisma.detalleServicio.create({
                data: {
                    cantidad:CrateDetalleDto.cantidad,
                    idOrdenServicio: CrateDetalleDto.idOrdenServicio,
                    idRepuesto: CrateDetalleDto.idRepuesto,
                    subTotal:total
                }
            })
        } catch (error) {
            return (`hubo un problema al crear un nuevo detalle de Servicio`)
        }
    }
    async update(id:number, UpdateDetalleDto:UpdateDetalleDto){
        try {
            return await this.prisma.detalleServicio.update({
                where: {id},
                data: UpdateDetalleDto
            })
        } catch (error) {
            return (`hubo un error al intentar actulizar la tabla detalle`)
        }
    }
    async remove(id:number){
        try {
            const detalle = await this.prisma.detalleServicio.findUnique({
                where: {id}
            })
            if(!detalle){
                throw new NotFoundException(`el detalle con id ${id} no se encontro`)
            }
            return await this.prisma.detalleServicio.delete({
                where: {id}
            })
        } catch (error) {
            return (`se elimino con exito el detalle con id ${id} `)
        }
    }
}
