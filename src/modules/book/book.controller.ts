import { Controller } from '@nestjs/common';
import { BookDBService } from './book.service';

@Controller('book')
export class BookDBModule {
  constructor(private readonly bookService: BookDBService) {}
}
