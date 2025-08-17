import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpStatus, ParseFilePipeBuilder, BadRequestException, Query, Res, Response } from '@nestjs/common'
import { HttpService } from '@nestjs/axios';;
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookValidationPipe } from './pipes/book.pipe';

const fileConfig = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /^(image\/png|image\/jpg|image\/jpeg)$/
  })
  .build({
    fileIsRequired: false,
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });

@Controller('reserva')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createBookingWithoutPayment(
    @Body(BookValidationPipe) createBookDto: CreateBookDto,
    @UploadedFile(fileConfig) file: Express.Multer.File
    ) {
    // if (!file) throw new BadRequestException('El archivo es requerido y no fue adjuntado.');
    return this.bookService.createWithoutPayment(
      createBookDto, 
      file
    );
  }

  @Post("payment")
  createBooking(
    @Body(BookValidationPipe) createBookDto: CreateBookDto
    ) {
      console.log(createBookDto);
      
      return this.bookService.createPaymentRequest(
        createBookDto
      );
  }

  @Get('payment/response')
  async obtenerRespuesta(@Query('id') transactionId: string) {
    return this.bookService.getTransaction(transactionId);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
