import { Controller, Get, StreamableFile } from '@nestjs/common';
import { BooksService } from './books.service';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/api/data')
  getBook(@Res() res: Response): void {
    const filePath = join(process.cwd(), 'book.json');
    const fileStream = createReadStream(filePath);
    const fileStats = statSync(filePath);
    const contentLength = fileStats.size;

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
      'Content-Length': contentLength.toString(),
    });

    fileStream.pipe(res);
  }
}
