import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { VolunteersService } from './volunteers.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { IVolunteer, IVolunteers } from './interfaces';

@Controller('volunteers')
export class VolunteersController {
  constructor(private readonly volunteersService: VolunteersService) {}

  @Post()
  async create(@Body() dto: CreateVolunteerDto): Promise<IVolunteer> {
    return this.volunteersService.create(dto);
  }

  @Get(':phone')
  async findByPhone(@Param('phone') phone: string): Promise<IVolunteer> {
    return this.volunteersService.findByPhone(phone);
  }

  @Get('id/:id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<IVolunteer> {
    return this.volunteersService.findById(id);
  }

  @Get()
  async findAll(): Promise<IVolunteers> {
    return this.volunteersService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVolunteerDto,
  ): Promise<IVolunteer> {
    return this.volunteersService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.volunteersService.delete(id);
  }
}
