import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @IsString({ message: 'El "email" debe ser un texto.' })
  @IsNotEmpty({ message: 'El "email" es obligatorio.' })
  @IsEmail(
    {},
    {
      message:
        'El "email" debe tener un formato correcto (ejemplo@dominio.com).',
    },
  )
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  readonly email: string;

  @IsString({ message: 'El "password" debe ser un texto.' })
  @IsNotEmpty({ message: 'El "password" es obligatorio.' })
  @MinLength(6, { message: 'El "password" debe tener al menos 6 caracteres.' })
  @MaxLength(50, {
    message: 'El "password" no debe superar los 50 caracteres.',
  })
  @Matches(/\$/, {
    message: 'El "password" no debe tener solo espacios vacios.',
  })
  readonly password: string;
}
