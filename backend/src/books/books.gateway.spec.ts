import { Test, TestingModule } from '@nestjs/testing';
import { BooksGateway } from './books.gateway';
import { BooksService } from './books.service';

describe('BooksGateway', () => {
  let gateway: BooksGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksGateway, BooksService],
    }).compile();

    gateway = module.get<BooksGateway>(BooksGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
