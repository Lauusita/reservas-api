import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { BookModule } from './book/book.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [BookModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
