import { Transform } from 'class-transformer';
import { Role } from '../../generated/prisma/enums.js';
import {
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsEnum,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: "Los 'nombres' deben ser un texto." })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({
    message:
      "Los 'nombres' son obligatorios y no deben contener solo espacios.",
  })
  @MinLength(2, { message: "Los 'nombres' deben tener al menos 2 caracteres." })
  @MaxLength(100, {
    message: "Los 'nombres' no deben tener más de 100 caracteres.",
  })
  readonly nombres: string;

  @IsString({ message: "Los 'apellidos' deben ser un texto." })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({
    message:
      "Los 'apellidos' son obligatorios y no deben contener solo espacios.",
  })
  @MinLength(2, {
    message: "Los 'apellidos' deben tener al menos 2 caracteres.",
  })
  @MaxLength(100, {
    message: "Los 'apellidos' no deben tener más de 100 caracteres.",
  })
  readonly apellidos: string;

  @IsString({ message: "El 'email' debe ser un texto." })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsNotEmpty({ message: "El 'email' es obligatorio." })
  @IsEmail(
    {},
    {
      message:
        "El 'email' debe tener un formato correcto (ejemplo@dominio.com).",
    },
  )
  readonly email: string;

  @IsString({ message: "El 'password' debe ser un texto." })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({
    message: "El 'password' es obligatorio y no debe contener solo espacios.",
  })
  @MinLength(6, { message: "El 'password' debe tener al menos 6 caracteres." })
  @MaxLength(20, {
    message: "El 'password' no debe tener más de 20 caracteres.",
  })
  readonly password: string;

  @IsNotEmpty({ message: "El 'role' es obligatorio." })
  @IsEnum(Role, {
    message: `El 'role' debe ser uno de los siguientes valores: ${Object.values(Role).join(', ')}`,
  })
  readonly role: Role;
}
