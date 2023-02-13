import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InternController } from './intern.controller';
import { InternService } from './intern.service';
import { InternSchema } from './intern.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Intern', schema: InternSchema }]),
  ],
  controllers: [InternController],
  providers: [InternService],
})
export class InternModule {}
