import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto, userId: number) {
    const event = await this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        date: new Date(dto.date),
        address: dto.address,
        userId, // берём из JWT
      },
    });

    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      address: event.address,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }

  async findAll() {
    return this.prisma.event.findMany({
      orderBy: { date: 'asc' },
    });
  }

  async findById(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }

  async update(id: string, dto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id: Number(id) },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
