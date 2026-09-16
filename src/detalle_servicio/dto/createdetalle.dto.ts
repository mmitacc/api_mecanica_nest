import { IsInt, IsNumber, IsPositive, isString } from 'class-validator';
import { Transform } from 'class-transformer';


export class CrateDetalleDto {
  @IsInt({message: "la cantidad debe ser un numero entero"})
  @IsPositive({ message: 'la cantidad tiene que ser un numero positivo' })
  cantidad: number;
  @IsInt({message: "el id de orden de servicio debe ser un numero entero"})
  @IsPositive({ message: 'la id de orden de servicio tiene que ser un numero positivo' })
  idOrdenServicio: number;
  @IsInt({message: "el id del repuesto tiene que ser un numero entero"})
  @IsPositive({ message: 'el id del repuesto tiene que ser un numero positivo' })
  idRepuesto: number;
}
