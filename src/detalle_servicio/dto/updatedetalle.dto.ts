import { IsInt, IsNumber, IsPositive} from 'class-validator';

export class UpdateDetalleDto {
  @IsInt({ message: 'la cantidad debe ser un numero entero' })
  @IsPositive({ message: 'la cantidad tiene que ser un numero positivo' })
  cantidad: number;
}
