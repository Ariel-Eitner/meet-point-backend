import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCustomBase, UserCustomDocument } from './user.custom.schema';
import { CreateUserCustomDto } from './create-user.custom.dto';
import { UpdateUserDto } from './update-user.custom.dto';
import {
  Appointment,
  AppointmentDocument,
} from 'src/appointment/appointment.schema';
import {
  BusinessHour,
  BusinessHourDocument,
} from 'src/business-hours/business-hours.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserCustomBase.name)
    protected userModel: Model<UserCustomDocument>,
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(BusinessHour.name)
    private businessHourModel: Model<BusinessHourDocument>,
  ) {}

  async createUser(
    createUserDto: CreateUserCustomDto,
  ): Promise<{ user?: UserCustomBase; message: string }> {
    try {
      const existingUser = await this.userModel
        .findOne({ email: createUserDto.email.toLowerCase() })
        .exec();
      console.log(existingUser);
      if (existingUser) {
        return new HttpException(
          'User with this email already exists',
          HttpStatus.CONFLICT,
        );
      }

      const newUser = new this.userModel(createUserDto);
      await newUser.save();
      return { user: newUser, message: 'User successfully created.' };
    } catch (error) {
      if (error.code === 11000) {
        const fieldName = Object.keys(error.keyValue)[0];
        const fieldValue = error.keyValue[fieldName];
        throw new HttpException(
          `The ${fieldName}: ${fieldValue} is already in use.`,
          HttpStatus.CONFLICT,
        );
      }

      if (
        typeof error === 'object' &&
        error !== null &&
        'name' in error &&
        error['name'] === 'ValidationError'
      ) {
        const validationError = error as {
          errors: Record<string, { message: string }>;
        };
        const messages = Object.values(validationError.errors).map(
          (err) => err.message,
        );
        throw new HttpException(
          { message: 'Validation failed', errors: messages },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'An unexpected error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllUsers(): Promise<{ users?: UserCustomBase[]; message: string }> {
    const users = await this.userModel.find().exec();
    if (users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return { users, message: 'Users found successfully.' };
  }

  async findUserById(
    id: string,
  ): Promise<{ user: UserCustomBase; message: string }> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return { user, message: 'User found successfully.' };
  }

  async findUserByEmail(
    email: string,
  ): Promise<{ user: UserCustomBase; message: string }> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec();
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }
    return { user, message: 'User found successfully by email.' };
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ user: UserCustomBase; message: string }> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return { user: updatedUser, message: 'User updated successfully.' };
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const session = await this.userModel.db.startSession();
    try {
      session.startTransaction();

      // Intenta eliminar el usuario
      const result = await this.userModel
        .findByIdAndDelete(id)
        .session(session)
        .exec();
      if (!result) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.appointmentModel
        .deleteMany({ professionalId: id })
        .session(session)
        .exec();

      await this.businessHourModel
        .deleteMany({ professionalId: id })
        .session(session)
        .exec();

      await session.commitTransaction();
      return { message: 'User and all related data deleted successfully.' };
    } catch (error) {
      // Si hay un error, revertimos la transacción
      await session.abortTransaction();
      throw error; // Puedes decidir lanzar el error o manejarlo de manera diferente
    } finally {
      session.endSession();
    }
  }

  async findUsers(
    query: Record<string, any>,
  ): Promise<{ users: UserCustomBase[]; message: string }> {
    const users = await this.userModel.find(query).exec();
    if (users.length === 0) {
      throw new NotFoundException('No users found with the given query.');
    }
    return { users, message: 'Users found successfully with given query.' };
  }
}
