import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BusinessHour, BusinessHourDocument } from './business-hours.schema';

import { UpdateBusinessHourDto } from './dto/update-business-hours.dto';
import { CreateBusinessHourDto } from './dto/create-business-hours.dto';

@Injectable()
export class BusinessHoursService {
  constructor(
    @InjectModel(BusinessHour.name)
    private businessHourModel: Model<BusinessHourDocument>,
  ) {}

  async createOrUpdate(
    createBusinessHourDto: CreateBusinessHourDto,
  ): Promise<BusinessHour> {
    const existingBusinessHour = await this.businessHourModel.findOne({
      professionalId: createBusinessHourDto.professionalId,
    });

    if (existingBusinessHour) {
      return this.businessHourModel.findByIdAndUpdate(
        existingBusinessHour._id,
        createBusinessHourDto,
        { new: true },
      );
    } else {
      const createdBusinessHour = new this.businessHourModel(
        createBusinessHourDto,
      );
      return createdBusinessHour.save();
    }
  }

  async findAll(): Promise<BusinessHour[]> {
    return this.businessHourModel.find().populate('professionalId').exec();
  }

  async findOne(id: string): Promise<BusinessHour> {
    const businessHour = await this.businessHourModel
      .findById(id)
      .populate('professionalId');
    if (!businessHour) {
      throw new NotFoundException(
        `No se encontró el horario laboral con el ID "${id}".`,
      );
    }
    return businessHour;
  }

  async update(
    id: string,
    updateBusinessHourDto: UpdateBusinessHourDto,
  ): Promise<BusinessHour> {
    const updatedBusinessHour = await this.businessHourModel.findByIdAndUpdate(
      id,
      updateBusinessHourDto,
      { new: true },
    );
    if (!updatedBusinessHour) {
      throw new NotFoundException(
        `No se encontró el horario laboral con el ID "${id}" para actualizar.`,
      );
    }
    return updatedBusinessHour;
  }

  async delete(id: string): Promise<any> {
    const result = await this.businessHourModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(
        `No se encontró el horario laboral con el ID "${id}" para eliminar.`,
      );
    }
    return { message: 'Horario laboral eliminado exitosamente' };
  }

  async findByProfessionalId(professionalId: string): Promise<BusinessHour> {
    const businessHour = await this.businessHourModel
      .findOne({ professionalId })
      .populate('professionalId');
    if (!businessHour) {
      throw new NotFoundException(
        `No se encontró el horario laboral para el profesional con ID "${professionalId}".`,
      );
    }
    return businessHour;
  }
}
