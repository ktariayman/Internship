import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InternDocument = Intern & Document;

@Schema()
export class Intern {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  company: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  category: string;
}

export const InternSchema = SchemaFactory.createForClass(Intern);
