import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { BooksService } from './books.service';

import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import axios from 'axios';
import { PassThrough } from 'stream';


let books = []

@WebSocketGateway(
  {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    }
  }
)
export class BooksGateway {
  constructor(private readonly booksService: BooksService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('downloadBook')
  async create() {
    const apiUrl = 'http://thirdparty:3030/books/api/data';
    const savePath = "/Users/ael-bekk/Desktop/Assessment/tmp/src/downloaded_file.json"
    const bufferStream = new PassThrough();

    console.log('Downloading file...');
    console.log('Save path:', savePath);
    console.log('API URL:', apiUrl);

    try {
      const response = await axios({
        method: 'get',
        url: apiUrl,
        responseType: 'stream'
      });

      const totalLength = parseInt(response.headers['content-length'], 10);
      console.log('totalLength', response.headers['content-length'])
      let downloadedBytes = 0;

      response.data.on('data', (chunk) => {
        // console.log('chunk to string', chunk.toString())
        downloadedBytes += chunk.length;
        const percentage = (downloadedBytes / totalLength) * 100;
        // console.log(`Downloaded: ${percentage.toFixed(2)}%`);

        this.server.emit('percentage', percentage);

        bufferStream.write(chunk);

      });
      response.data.on("end", () => {
        console.log('Download complete');
        bufferStream.end();
        try {
          books = JSON.parse(bufferStream.read().toString());
          this.booksService.create(books)
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });
    } catch (error) {
      console.error('Error downloading file:', error);
    }
    console.log("anhyto 3amaly");
  }

  @SubscribeMessage('findAllBooks')
  findAll() {
    return this.booksService.findAll();
  }

}
