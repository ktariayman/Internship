import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { InternService } from './intern.service';
import { InternDocument } from './intern.schema';

@Controller('intern')
export class InternController {
  constructor(private internService: InternService) {}
  @Post()
  createInternship(
    @Body('name') name: string,
    @Body('company') company: string,
    @Body('category') category: string,
    @Body('description') description?: string,
  ): Promise<InternDocument> {
    return this.internService.createIntern(
      name,
      company,
      description,
      category,
    );
  }
  @Get()
  getInternships(): Promise<InternDocument[] | string> {
    return this.internService.getAllInterns();
  }

  @Get(':id')
  getInternship(@Param('id') id: string): Promise<InternDocument | string> {
    return this.internService.getOneInternship(id);
  }

  @Patch(':id')
  updateInternship(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('category') category: string,
    @Body('company') company: string,
  ): Promise<InternDocument | string> {
    return this.internService.updateInternship(
      id,
      name,
      category,
      description,
      company,
    );
  }

  @Delete(':id')
  deleteInternship(@Param('id') id: string) {
    return this.internService.deleteInternship(id);
  }
}
