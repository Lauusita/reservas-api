import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsEnum, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { Puerto, PuertoType } from "src/types/puertos";
import { StateValidation } from "src/types/states-validation";

export class CreateBookDto {
  @IsOptional()
  id: string

  @IsNotEmpty({ message: 'El campo "correo" es obligatorio.' })
  @IsEmail()
  correo: string;

  @IsString({ message: 'El campo "nombreCompleto" debe ser una cadena de texto.' })
  @IsNotEmpty()
  nombreCompleto: string

  @IsString()
  @IsNotEmpty({ message: 'El campo "telefono" es obligatorio.' })
  telefono: string;
  
  @IsString()
  @IsNotEmpty({ message: 'El campo "documentoIdentidad" es obligatorio.' })
  documentoIdentidad: string;

  @IsNotEmpty({ message: 'El campo "fechaReserva" es obligatorio.' })
  @IsDate()
  @Type(() => Date)
  fechaReserva: Date;

  @IsNotEmpty({ message: 'El campo "horaReserva" es obligatorio.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, {
    message: 'horaReserva debe estar en formato HH:mm:ss',
  })
  horaReserva: string;

  @IsOptional()
  @IsString()
  volantePagoUrl?: string
  
  @IsNumber()
  @IsNotEmpty({ message: 'El campo "cantidadPersonas" es obligatorio.' })
  @Type(() => Number)
  cantidadPersonas: number;

  @IsOptional()
  @IsEnum(StateValidation, { message: 'El estado de validación debe ser uno de los siguientes: PENDIENTE, VALIDADA, RECHAZADA.' })
  estadoValidacion: StateValidation;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsEnum(Puerto, { message: 'El puerto debe ser uno de los siguientes: PUERTO_NARINO, CABALLO_COCHA, VEINTE_DE_JULIO.' } )
  puertoOrigen: PuertoType;

  @IsEnum(Puerto, { message: 'El puerto debe ser uno de los siguientes: PUERTO_NARINO, CABALLO_COCHA, VEINTE_DE_JULIO.' } )
  puertoDestino: PuertoType;
}
