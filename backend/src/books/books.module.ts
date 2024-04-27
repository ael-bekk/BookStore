import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksGateway } from './books.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { Book } from './schemas/book.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }])],

  providers: [BooksGateway, BooksService],
})
export class BooksModule {}
