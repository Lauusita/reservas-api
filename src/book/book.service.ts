import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDBService } from 'src/modules/book/book.service';
import { Message } from 'src/types/response';
import { MailService } from 'src/email/email.service';
import { SupabaseClient } from 'src/supabase/supabase.client.ts';
import { StateValidation } from 'src/types/states-validation';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';


@Injectable()
export class BookService {
  constructor(
    private readonly dbPrismaService: BookDBService,
    private readonly supabaseClient: SupabaseClient
  ) {}

  async create(createBookDto: CreateBookDto, attachment: Express.Multer.File): Promise<Message<CreateBookDto>> {
    try {
      const id = uuidv4();
      let volanteUrl = "Not provided";
      let showUrl = false;

      if (attachment) {
        showUrl = true;
        attachment.path = `public/${id}/${attachment.originalname}`;
        
        const bucket = await this.supabaseClient
        .uploadFile(
          "constancia-pago", 
          attachment.path, 
          attachment.buffer, 
          attachment.mimetype
        );
  
        volanteUrl = await this.supabaseClient
        .getSignedUrl(
          "constancia-pago", 
          bucket.path
        );        
      }

      let { volantePagoUrl } = createBookDto
      volantePagoUrl = volanteUrl;
      
      await this.dbPrismaService.create({
        ...createBookDto,
        id,
        volantePagoUrl,
        estadoValidacion: StateValidation.PENDIENTE
      });

      const mailService = new MailService();

      const htmlBody = {
        nombreCompleto: createBookDto.nombreCompleto,
        puertoOrigen: createBookDto.puertoOrigen,
        puertoDestino: createBookDto.puertoDestino.replace("_", " "),
        correo: createBookDto.correo,
        telefono: createBookDto.telefono,
        documentoIdentidad: createBookDto.documentoIdentidad,
        fechaReserva: createBookDto.fechaReserva,
        horaReserva: createBookDto.horaReserva,
        cantidadPersonas: createBookDto.cantidadPersonas,
        volantePagoUrl,
        showUrl
      }

      const html = mailService.compileTemplate('booking-receipt', htmlBody);
      
      await mailService.sendEmail(
        createBookDto.correo, 
        "RESERVA CREADA EXITOSAMENTE", 
        "Su reserva ha sido creada exitosamente. Detalles de la reserva:\n",
        html
      )
      return { 
        msg: 'Reserva creada exitosamente',
        data: { ...createBookDto, volantePagoUrl }
      } as Message<CreateBookDto>;

    } catch (error) {
      throw new BadRequestException
        ('Un error inesperado surgió, por favor intente más tarde', error.message);
    }
  }

  async findAll() {
    try {
      console.log(process.env.AWS_EMAIL);
      
      return "enviado"
    } catch (error) {
      throw new BadRequestException(
        'Un error inesperado surgió, por favor intente más tarde',  )
    }
  }

  async sendMail() {
    try {
      console.log(process.env.AWS_EMAIL);
      
      return "enviado"
    } catch (error) {
      throw new BadRequestException(
        'Un error inesperado surgió, por favor intente más tarde',  )
    }
  }
  
  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
