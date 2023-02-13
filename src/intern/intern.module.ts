import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InternController } from './intern.controller';
import { InternService } from './intern.service';
import { InternSchma } from './product.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"Intern",schema:InternSchma}])
  ],
  controllers: [InternController],
  providers: [InternService]
})
export class InternModule {}
