import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternModule } from './intern/intern.module';
@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost:27017/internship'),
    InternModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
