import { Module } from '@nestjs/common';
import { BookDBService } from './book.service';
import { BookDBModule } from './book.controller';

@Module({
  controllers: [BookDBModule],
  providers: [BookDBService]
})
export class BookModule {}
