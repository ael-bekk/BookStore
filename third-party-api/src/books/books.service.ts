import { Injectable, StreamableFile, Res } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';


@Injectable()
export class BooksService {
  constructor() {}

  getBook(@Res({ passthrough: true }) res: Response): StreamableFile {
      const file = createReadStream(join(process.cwd(), 'package.json'));
      res.set({
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="package.json"',
        'Content-Length': statSync(join(process.cwd(), 'package.json')).size,
      });
      return new StreamableFile(file);
    }
}