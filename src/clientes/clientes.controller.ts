import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { ClientesService } from './clientes.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('clientes')
@UseGuards(JwtAuthGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  async findAll() {
    const clientes = await this.clientesService.findAll();

    return {
      data: clientes,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const cliente = await this.clientesService.findOne(id);

    return {
      data: cliente,
    };
  }

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    const cliente = await this.clientesService.create(createClienteDto);

    return {
      message: 'Cliente creado con éxito',
      data: cliente,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    const cliente = await this.clientesService.update(id, updateClienteDto);

    return {
      message: 'Cliente actualizado con éxito',
      data: cliente,
    };
  }
}
