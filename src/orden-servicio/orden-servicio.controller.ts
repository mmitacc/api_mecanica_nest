import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { OrdenService } from './orden-servicio.service.js';
import { CreateOrdenDto } from './dto/create-orden.dto.js';
import { UpdateOrdenDto } from './dto/update-orden.dto.js';
import { inputFechas } from './dto/reporte-orden.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('ordenes')
export class OrdenServicioController {
  constructor(private readonly ordenesService: OrdenService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'DUEÑO')
  @Post() //req.body
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordenesService.create(createOrdenDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DUEÑO', 'RECEPCIONISTA')
  @Get('/todas/')
  findAll() {
    return this.ordenesService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DUEÑO', 'RECEPCIONISTA')
  @Get('/Byid/:id') //req.params.id
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MECANICO')
  @Get('/misordenes/')
  async misordenes(@Req() req: Request & { user: any }) {
    const id = Number(req.user.id);
    return this.ordenesService.findbyMech(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DUEÑO')
  @Patch('/updateByid/:id')
  update(@Param('id') id: string, @Body() updateOrdenDto: UpdateOrdenDto) {
    return this.ordenesService.update(+id, updateOrdenDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DUEÑO')
  @Delete('/deleteByid/:id')
  remove(@Param('id') id: string) {
    return this.ordenesService.remove(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DUEÑO')
  @Post('/reporte')
  getReporte(@Body() fechas: inputFechas) {
    return this.ordenesService.getReporte(fechas);
  }
}
