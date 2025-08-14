import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookDBService } from 'src/modules/book/book.service';
import { SupabaseClient } from 'src/supabase/supabase.client.ts';
import { MailService } from 'src/email/email.service';

@Module({
  controllers: [BookController],
  providers: [ PrismaService, BookService, BookDBService, SupabaseClient, MailService ],
})
export class BookModule {}
