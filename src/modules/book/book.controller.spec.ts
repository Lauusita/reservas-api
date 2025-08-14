import { Test, TestingModule } from '@nestjs/testing';
import { BookDBModule } from './book.controller';
import { BookDBService } from './book.service';

describe('BookController', () => {
  let controller: BookDBModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookDBModule],
      providers: [BookDBService],
    }).compile();

    controller = module.get<BookDBModule>(BookDBModule);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
