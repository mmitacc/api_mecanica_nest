import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdenService } from './orden-servicio.service.js';
import { CreateOrdenDto } from './dto/create-orden.dto.js';
import { UpdateOrdenDto } from './dto/update-orden.dto.js';

@Controller('ordenes')
export class ProductsController {
  constructor(private readonly ordenesService: OrdenService) {}

  @Post() //req.body
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordenesService.create(createOrdenDto);
  }

  @Get()
  findAll() {
    return this.ordenesService.findAll();
  }

  @Get(':id') //req.params.id
  findOne(@Param('id') id: string) {
    return this.ordenesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenDto: UpdateOrdenDto) {
    return this.ordenesService.update(+id, updateOrdenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenesService.remove(+id);
  }
}