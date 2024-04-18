import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { BusinessHoursService } from 'src/business-hours/business-hours.service';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly businessHourService: BusinessHoursService,
  ) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const { startDate, endDate, professionalId } = createAppointmentDto;

    const businessHour =
      await this.businessHourService.findByProfessionalId(professionalId);
    if (!businessHour) {
      throw new BadRequestException(
        'Horario de negocio no encontrado para el profesional especificado.',
      );
    }

    const appointmentStart = new Date(startDate);
    const appointmentEnd = new Date(endDate);
    const businessStart = new Date(
      appointmentStart.toISOString().split('T')[0] +
        'T' +
        businessHour.startTime,
    );
    const businessEnd = new Date(
      appointmentEnd.toISOString().split('T')[0] + 'T' + businessHour.endTime,
    );

    // Verificar que la cita esté dentro del horario de negocio
    if (appointmentStart < businessStart || appointmentEnd > businessEnd) {
      throw new BadRequestException(
        `La cita debe estar dentro del horario de negocio del profesional: ${businessHour.startTime} - ${businessHour.endTime}.`,
      );
    }

    // Verificar los días de la semana
    const selectedDay = appointmentStart.getDay();
    if (!businessHour.daysOfWeek.includes(selectedDay)) {
      throw new BadRequestException(
        'La cita cae en un día no laborable para el profesional.',
      );
    }

    // Crear la cita si pasa las validaciones
    return this.appointmentService.createAppointment(createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Get('/by-user/:id')
  findAllByUser(@Param('id') id: string) {
    return this.appointmentService.findAllByUser(id);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    const { startDate, endDate, professionalId } = updateAppointmentDto;

    // Buscar el horario de negocio del profesional
    const businessHour =
      await this.businessHourService.findByProfessionalId(professionalId);
    if (!businessHour) {
      throw new BadRequestException(
        'Horario de negocio no encontrado para el profesional especificado.',
      );
    }

    const appointmentStart = new Date(startDate);
    const appointmentEnd = new Date(endDate);
    const businessStart = new Date(
      appointmentStart.toISOString().split('T')[0] +
        'T' +
        businessHour.startTime,
    );
    const businessEnd = new Date(
      appointmentEnd.toISOString().split('T')[0] + 'T' + businessHour.endTime,
    );

    // Verificar que la cita esté dentro del horario de negocio
    if (appointmentStart < businessStart || appointmentEnd > businessEnd) {
      throw new BadRequestException(
        `La cita debe estar dentro del horario de negocio del profesional: ${businessHour.startTime} - ${businessHour.endTime}.`,
      );
    }

    // Verificar los días de la semana
    const selectedDay = appointmentStart.getDay();
    if (!businessHour.daysOfWeek.includes(selectedDay)) {
      throw new BadRequestException(
        'La cita cae en un día no laborable para el profesional.',
      );
    }

    // Actualizar la cita si pasa las validaciones
    return this.appointmentService.updateAppointment(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.removeAppointment(id);
  }
}
