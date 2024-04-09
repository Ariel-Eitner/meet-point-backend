import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BusinessHoursService } from './business-hours.service';
import { CreateBusinessHourDto } from './dto/create-business-hours.dto';
import { UpdateBusinessHourDto } from './dto/update-business-hours.dto';

@Controller('business-hours')
export class BusinessHoursController {
  constructor(private readonly businessHoursService: BusinessHoursService) {}

  @Post()
  create(@Body() createBusinessHourDto: CreateBusinessHourDto) {
    return this.businessHoursService.createOrUpdate(createBusinessHourDto);
  }

  @Get()
  findAll() {
    return this.businessHoursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessHoursService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessHourDto: UpdateBusinessHourDto,
  ) {
    return this.businessHoursService.update(id, updateBusinessHourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessHoursService.delete(id);
  }
  @Get('/by-professional/:professionalId')
  findOneByProfessionalId(@Param('professionalId') professionalId: string) {
    return this.businessHoursService.findByProfessionalId(professionalId);
  }
}
