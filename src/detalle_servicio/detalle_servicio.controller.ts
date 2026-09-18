import { Controller, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { DetalleServicioService } from './detalle_servicio.service.js';
import {Get} from "@nestjs/common"
import { CrateDetalleDto } from './dto/createdetalle.dto.js';
import { UpdateDetalleDto } from './dto/updatedetalle.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('detalle-servicio')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('MECANICO','DUEÑO')
export class DetalleServicioController {
    constructor(private readonly DetalleServicioService:DetalleServicioService){}
    @Get()
    findAll(){
        return this.DetalleServicioService.findAll()
    }
    @Get(":id")
    findOne(@Param("id") id:string){
        return this.DetalleServicioService.findOne(+id)
    }
    @Post()
    create(@Body() CrateDetalleDto:CrateDetalleDto){
        return this.DetalleServicioService.create(CrateDetalleDto)
    }
    @Patch(":id")
    update(@Param("id") id:string, @Body()UpdateDetalleDto:UpdateDetalleDto){
        return this.DetalleServicioService.update(+id,UpdateDetalleDto)
    }
    @Delete(":id")
    remove(@Param("id") id:string){
        return this.DetalleServicioService.remove(+id)
    }
}
