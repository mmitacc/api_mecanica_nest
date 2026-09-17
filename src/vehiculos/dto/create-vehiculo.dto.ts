import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateVehiculoDto {
  @IsString({ message: 'Debes colocar un texto' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty({ message: 'La placa no puede estar vacía' })
  placa: string;

  @IsString({ message: 'La marca debe ser un texto' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty({ message: 'La marca no puede estar vacía' })
  marca: string;

  @IsString({ message: 'El modelo debe ser una cadena de texto' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty({ message: 'El modelo no puede estar vacío' })
  modelo: string;

  @IsInt({ message: 'El idCliente debe ser un número entero' })
  @Min(1, {message: 'El id del cliente debe ser mayor que 0' })
  idCliente: number;
}