import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<{ appointment: Appointment; message: string }> {
    const { professionalId, userId } = createAppointmentDto;

    if (
      !isValidObjectId(professionalId) ||
      (userId && !isValidObjectId(userId))
    ) {
      throw new BadRequestException('The provided ID is incorrect.');
    }

    const professionalExists = await this.userModel.findById(professionalId);
    if (!professionalExists || professionalExists.role !== 'professional') {
      throw new NotFoundException(
        `Professional with ID "${professionalId}" not found.`,
      );
    }

    if (userId) {
      const userExists = await this.userModel.findById(userId);
      if (!userExists || userExists.role !== 'client') {
        throw new NotFoundException(`User with ID "${userId}" not found.`);
      }
    }

    const newAppointment = await new this.appointmentModel(
      createAppointmentDto,
    ).save();
    return {
      appointment: newAppointment,
      message: 'Appointment created successfully',
    };
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentModel
      .find()
      .populate('professionalId userId')
      .exec();
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentModel
      .findById(id)
      .populate('professionalId userId');
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID "${id}" not found`);
    }
    return appointment;
  }

  async findAllByUser(id: string): Promise<Appointment[]> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid user ID.');
    }
    return this.appointmentModel
      .find({ professionalId: id })
      .populate('professionalId userId')
      .exec();
  }

  async updateAppointment(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<{ updatedAppointment: Appointment; message: string }> {
    const updatedAppointment = await this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, { new: true })
      .populate('professionalId userId');
    if (!updatedAppointment) {
      throw new NotFoundException(`Appointment with ID "${id}" not found`);
    }

    return {
      updatedAppointment,
      message: 'Appointment updated successfully',
    };
  }

  async removeAppointment(id: string): Promise<void> {
    const result = await this.appointmentModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Appointment with ID "${id}" not found`);
    }
  }
}
