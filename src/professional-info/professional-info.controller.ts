import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ProfessionalInfoService } from './professional-info.service';
import { CreateProfessionalInfoDto } from './dto/create-professional-info.dto';
import { UpdateProfessionalInfoDto } from './dto/update-professional-info.dto';

@Controller('professional-info')
export class ProfessionalInfoController {
  constructor(
    private readonly professionalInfoService: ProfessionalInfoService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProfessionalInfoDto: CreateProfessionalInfoDto) {
    const result = await this.professionalInfoService.create(
      createProfessionalInfoDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Professional information created successfully',
      data: result,
    };
  }

  @Get()
  async findAll() {
    const result = await this.professionalInfoService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Professional informations retrieved successfully',
      data: result,
    };
  }

  @Get('/by-user/:userId')
  async findOneByUserId(@Param('userId') userId: string) {
    return this.professionalInfoService.findOneByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.professionalInfoService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Professional information retrieved successfully',
      data: result,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfessionalInfoDto: UpdateProfessionalInfoDto,
  ) {
    const result = await this.professionalInfoService.update(
      id,
      updateProfessionalInfoDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Professional information updated successfully',
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.professionalInfoService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Professional information deleted successfully',
    };
  }
}
