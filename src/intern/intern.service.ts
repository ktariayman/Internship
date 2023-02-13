import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InternDocument } from './product.schema';

@Injectable()
export class InternService {
  constructor(
    @InjectModel('Intern') private readonly internModel: Model<InternDocument>,
  ) {}

  async createIntern(
    name: string,
    company: string,
    category: string,
    description: string,
  ): Promise<InternDocument> {
    const newIntern = new this.internModel({
      name,
      category,
      description,
      company,
    });
    return newIntern.save();
  }

  async getAllInterns(): Promise<InternDocument[] | string> {
    const interns = await this.internModel.find();
    if (!interns) return 'no data here';
    return interns;
  }

  async getOneInternship(id: string): Promise<InternDocument | string> {
    const internshipExist = await this.internModel.findById(id);
    if (!internshipExist) return 'no data';
    return internshipExist;
  }

  async updateInternship(
    id: string,
    newName: string,
    newCategory: string,
    newDescription: string,
    newCompany: string,
  ): Promise<InternDocument | string> {
    const internshipExist = await this.internModel.findById(id);
    if (!internshipExist) return 'no data to update with this id:' + id;
    if (newName) internshipExist.name = newName;
    if (newCategory) internshipExist.category = newCategory;
    if (newCompany) internshipExist.company = newCompany;
    if (newDescription) internshipExist.description = newDescription;
    return await internshipExist.save();
  }
  async deleteInternship(id: string) {
    return this.internModel.deleteOne({ _id: id });
  }
}
