import { Controller, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { DetalleServicioService } from './detalle_servicio.service.js';
import {Get} from "@nestjs/common"
import { CrateDetalleDto } from './dto/createdetalle.dto.js';
import { UpdateDetalleDto } from './dto/updatedetalle.dto.js';


@Controller('detalle-servicio')
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
