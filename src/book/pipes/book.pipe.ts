
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Reserva } from '@prisma/client';

@Injectable()
export class BookValidationPipe implements PipeTransform {
  transform(value: Reserva, metadata: ArgumentMetadata) {
    let { 
      cantidadPersonas, 
      correo, 
      documentoIdentidad, 
      horaReserva, 
      nombreCompleto, 
      telefono,
      fechaReserva
    } = value

    if (!fechaReserva || !cantidadPersonas || !correo || !documentoIdentidad || !horaReserva || !nombreCompleto || !telefono ) {
      throw new BadRequestException('Todos los campos son obligatorios');
    }

    if (fechaReserva) {
      value.fechaReserva = new Date(value.fechaReserva);
    }

    if (cantidadPersonas) {
      value.cantidadPersonas = parseInt(value.cantidadPersonas as any);
      console.log(typeof value.cantidadPersonas);
      
    }

    if (cantidadPersonas <= 0) {
      throw new BadRequestException('La cantidad de personas debe ser mayor a cero');
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(correo)) {
      throw new BadRequestException('Correo electrónico inválido');
    }
    
    return value;
  }
}
