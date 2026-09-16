import {
    IsInt,
    IsNotEmpty,
    IsString,
    Min,
} from 'class-validator';

export class CreateVehiculoDto {
    @IsString({message: 'Debes colocar un texto'})
    @IsNotEmpty({message: 'La placa no puede estar vacía'})
    placa: string;

    @IsString({message: 'La marca debe ser un texto'})
    @IsNotEmpty({message: "Marca no puede estar vacía"})
    marca: string;

    @IsString({message: 'Modelo debe ser una cadena de texto'})
    @IsNotEmpty({message: 'El modelo debe no puede estar vacío'})
    modelo: string;

    @IsInt({message: 'El idCliente debe ser un número entero'})
    @Min(1, { message: 'El id del cliente debe ser mayor que 0'})
    idCliente: number;
}
