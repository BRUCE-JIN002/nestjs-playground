import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [DbModule.register({ path: 'src/db/books.json' })],
})
export class BookModule {}
