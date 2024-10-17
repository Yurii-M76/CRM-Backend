import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { IVolunteer, IVolunteers } from './interfaces';
import { PrismaService } from '@prisma/prisma.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { NotFoundVolunteerException } from './exceptions/not-found.exception';
import { VolunteerEntity } from './volunteer.entity';

@Injectable()
export class VolunteersService {
  private readonly logger = new Logger(VolunteersService.name);

  private volunteer: IVolunteer[] = [];

  constructor(private readonly prismaService: PrismaService) {}

  async create(createVolunteerDto: CreateVolunteerDto): Promise<IVolunteer> {
    const newVolunteer = new VolunteerEntity(
      createVolunteerDto.surname,
      createVolunteerDto.name,
      createVolunteerDto.patronymic,
      createVolunteerDto.phone,
      createVolunteerDto.email,
      createVolunteerDto.rating,
      createVolunteerDto.projects,
    );

    const checkIsVolunteer: IVolunteer = await this.findByPhone(
      createVolunteerDto.phone,
    ).catch(() => {
      return null;
    });
    if (checkIsVolunteer) {
      throw new ConflictException(
        'Пользователь с таким номером телефона уже существует',
      );
    }
    return await this.prismaService.volunteers
      .create({
        data: newVolunteer,
      })
      .catch(() => {
        throw new BadRequestException(
          `Не получается сохранить волонтера с даными ${JSON.stringify(createVolunteerDto)}`,
        );
      });
  }

  async findAll(): Promise<IVolunteers> {
    const volunteers = await this.prismaService.volunteers.findMany();
    return { count: volunteers.length, items: volunteers };
  }

  async findByPhone(phone: string): Promise<IVolunteer> {
    const volunteer = await this.prismaService.volunteers.findFirst({
      where: { phone },
    });
    if (!volunteer) {
      throw new NotFoundVolunteerException();
    }
    return volunteer;
  }

  async findById(id: string): Promise<IVolunteer> {
    const volunteer = await this.prismaService.volunteers.findFirst({
      where: { id },
    });
    if (!volunteer) {
      throw new NotFoundVolunteerException();
    }
    return volunteer;
  }

  async update(id: string, dto: UpdateVolunteerDto) {
    return this.prismaService.volunteers
      .update({
        where: { id },
        data: dto,
      })
      .catch(() => {
        throw new HttpException(
          'Ошибка обновления данных',
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async delete(id: string) {
    const volunteer = await this.prismaService.volunteers
      .delete({
        where: { id },
        select: { id: true },
      })
      .catch(() => {
        throw new NotFoundVolunteerException();
      });
    return volunteer;
  }
}
