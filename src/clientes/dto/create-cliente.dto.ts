import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateClienteDto {
  @IsString({ message: 'el nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el nombre es obligatorio' })
  @MinLength(2, {
    message: 'el nombre debe tener al menos 2 caracteres',
  })
  @Matches(/\S/, {
    message: 'el nombre no puede contener solo espacios',
  })
  nombres: string;

  @IsString({ message: 'los apellidos deben ser una cadena de texto' })
  @IsNotEmpty({ message: 'los apellidos son obligatorios' })
  @MinLength(2, {
    message: 'los apellidos deben tener al menos 2 caracteres',
  })
  @Matches(/\S/, {
    message: 'los apellidos no pueden contener solo espacios',
  })
  apellidos: string;

  @IsEmail(
    {},
    {
      message: 'el email debe estar en el formato correcto',
    },
  )
  @IsNotEmpty({ message: 'el email es obligatorio' })
  email: string;
}
