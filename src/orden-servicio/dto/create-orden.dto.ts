import {
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsNumber,
  IsPositive,
  IsOptional,
  IsInt,
  IsIn,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoServicio } from '../../generated/prisma/enums.js';

export class CreateOrdenDto {
  @IsString({ message: 'La descripcion debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripcion es obligatorio' })
  @MinLength(2, { message: 'La descripcion debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'La descripcion  no puede contener solo espacios',
  })
  @Max(100, { message: 'El limite máximo son 100 caracteres' })
  descripcion: string;
  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El costomecanico debe ser un numero de hasta dos decimales' },
  )
  @IsPositive({ message: 'El costomecanico debe ser positivo' })
  costomecanico?: number;
  @IsOptional()
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  @IsIn(['RECEPCIONADO', 'EN_REPARACION', 'LISTO'], {
    each: true,
    message:
      "Estado inválido: debe ser:'RECEPCIONADO', 'EN_REPARACION' o 'LISTO'",
  })
  estado?: EstadoServicio;
  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El total debe ser un numero de hasta dos decimales' },
  )
  @IsPositive({ message: 'El total debe ser positivo' })
  total?: number;
  @IsNotEmpty({ message: 'El idUsuario es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El idUsuario debe ser un número entero' })
  @IsPositive({ message: 'El idUsuario debe ser positivo' })
  idUsuario: number;
  @IsNotEmpty({ message: 'El idVehiculo es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El idVehiculo debe ser un número entero' })
  @IsPositive({ message: 'El idUsuario debe ser positivo' })
  idVehiculo: number;
}
