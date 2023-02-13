import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InternModule } from './intern/intern.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
  MongooseModule.forRoot('mongodb://localhost:27017/internship'),
    InternModule,
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
