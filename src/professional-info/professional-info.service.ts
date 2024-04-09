import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProfessionalInfo,
  ProfessionalInfoDocument,
} from './professional-info.schema';
import { CreateProfessionalInfoDto } from './dto/create-professional-info.dto';
import { UpdateProfessionalInfoDto } from './dto/update-professional-info.dto';

@Injectable()
export class ProfessionalInfoService {
  constructor(
    @InjectModel(ProfessionalInfo.name)
    private professionalInfoModel: Model<ProfessionalInfoDocument>,
  ) {}

  async create(
    createProfessionalInfoDto: CreateProfessionalInfoDto,
  ): Promise<any> {
    try {
      const createdProfessionalInfo = new this.professionalInfoModel(
        createProfessionalInfoDto,
      );
      await createdProfessionalInfo.save();
      return {
        professionalInfo: createdProfessionalInfo,
        message: 'Professional information created successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to create professional information',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<any> {
    const professionalInfos = await this.professionalInfoModel
      .find()
      .populate('userId') // Asume que 'userId' es el nombre del campo de referencia en tu esquema
      .exec();
    return {
      professionalInfos,
      message: 'Professional informations retrieved successfully',
    };
  }

  async findOne(id: string): Promise<any> {
    const professionalInfo = await this.professionalInfoModel
      .findById(id)
      .populate('userId')
      .exec();
    if (!professionalInfo) {
      throw new NotFoundException(
        `Professional information with ID ${id} not found`,
      );
    }
    return {
      professionalInfo,
      message: 'Professional information retrieved successfully',
    };
  }

  async findOneByUserId(userId: string): Promise<any> {
    const professionalInfo = await this.professionalInfoModel
      .findOne({ userId: userId }) // Cambio aquí para buscar por userId
      .populate('userId') // Opcional, si quieres incluir detalles del usuario
      .exec();

    if (!professionalInfo) {
      throw new NotFoundException(
        `Professional information for user with ID ${userId} not found`,
      );
    }

    return {
      professionalInfo,
      message: 'Professional information retrieved successfully',
    };
  }

  async update(
    id: string,
    updateProfessionalInfoDto: UpdateProfessionalInfoDto,
  ): Promise<any> {
    const updatedProfessionalInfo = await this.professionalInfoModel
      .findByIdAndUpdate(id, updateProfessionalInfoDto, { new: true })
      .exec();
    if (!updatedProfessionalInfo) {
      throw new NotFoundException(
        `Professional information with ID ${id} not found`,
      );
    }
    return {
      updatedProfessionalInfo,
      message: 'Professional information updated successfully',
    };
  }

  async remove(id: string): Promise<any> {
    const deletedProfessionalInfo = await this.professionalInfoModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedProfessionalInfo) {
      throw new NotFoundException(
        `Professional information with ID ${id} not found`,
      );
    }
    return { message: 'Professional information deleted successfully' };
  }
}
