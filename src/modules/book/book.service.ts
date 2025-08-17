import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookDBService {
  constructor(
    private readonly prisma: PrismaService, // Adjusted type to match the context
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      return await this.prisma.reserva.create({
        data: {
          ...createBookDto,
          volantePagoUrl: createBookDto.volantePagoUrl || null
        },
      });
    } catch (error) {
      throw new BadRequestException('Error creating book: ' + error.message);
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      return await this.prisma.reserva.update({
        where: { id },
        data: updateBookDto,
      });
    } catch (error) {
      throw new BadRequestException('Error updating book: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.reserva.findMany();
    } catch (error) {
      throw new BadRequestException('Error fetching books: ' + error.message);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.reserva.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Error fetching book: ' + error.message);
    }
  }

  async removeById(id: string) {
    try {
      return await this.prisma.reserva.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Error removing book: ' + error.message);
    }
  }
}
