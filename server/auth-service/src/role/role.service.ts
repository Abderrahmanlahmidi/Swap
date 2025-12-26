import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, description } = body;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!name) {
      throw new BadRequestException('Role name is required');
    }

    const exists = await this.prisma.role.findUnique({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      where: { name },
    });

    if (exists) {
      throw new BadRequestException('Role already exists');
    }

    return this.prisma.role.create({
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        description,
      },
    });
  }

  async findAll() {
    return this.prisma.role.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async update(id: number, body: any) {
    await this.findOne(id);

    return this.prisma.role.update({
      where: { id },
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        name: body.name,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        description: body.description,
      },
    });
  }

  async delete(id: number) {
    await this.findOne(id);

    return this.prisma.role.delete({
      where: { id },
    });
  }
}
