import { Test, TestingModule } from '@nestjs/testing';
import { BookDBService } from './book.service';

describe('BookService', () => {
  let service: BookDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookDBService],
    }).compile();

    service = module.get<BookDBService>(BookDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
