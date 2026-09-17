import { IsString } from 'class-validator';

export class inputFechas {
  @IsString()
  minFecha: string;
  @IsString()
  maxFecha: string;
}
