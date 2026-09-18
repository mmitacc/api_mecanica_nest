import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { password, ...restoDataUsuario } = createUsuarioDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await this.prisma.usuario.create({
      data: { password: hashedPassword, ...restoDataUsuario },
      omit: { password: true },
    });
    return { message: 'Usuario creado, exitosamente.', data: usuario };
  }
  // Además agregar el metodo findByEmail:
  async findByEmail(email: string) {
    return await this.prisma.usuario.findFirst({ where: { email } });
  }

  async findAll() {
    return await this.prisma.usuario.findMany({ omit: { password: true } });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findFirst({
      where: { id },
      omit: { password: true },
    });
    if (!usuario) throw new NotFoundException(`El id=${id} no se encuentra.`);
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.prisma.usuario.findFirst({
      where: { id },
      omit: { password: true },
    });
    if (!usuario) throw new NotFoundException(`El id=${id} no se encuentra.`);
    return await this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
      omit: { password: true },
    });
  }

  async remove(id: number) {
    const usuario = await this.prisma.usuario.findFirst({
      where: { id },
      omit: { password: true },
    });
    if (!usuario) throw new NotFoundException(`El id=${id} no se encuentra.`);
    return await this.prisma.usuario.delete({
      where: { id },
      omit: { password: true },
    });
  }
}
