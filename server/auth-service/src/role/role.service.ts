import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ROLE_MESSAGES } from './constants/role.constants';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) { }

  async create(body: any) {
    const { name, description } = body;

    if (!name) {
      throw new BadRequestException(ROLE_MESSAGES.ROLE_NAME_REQUIRED);
    }

    const exists = await this.prisma.role.findUnique({
      where: { name },
    });

    if (exists) {
      throw new BadRequestException(ROLE_MESSAGES.ROLE_ALREADY_EXISTS);
    }

    const role = await this.prisma.role.create({
      data: {
        name,
        description: description || null,
      },
    });

    return {
      status: 201,
      message: ROLE_MESSAGES.ROLE_CREATED,
      data: role,
    };
  }

  async findAll() {
    return this.prisma.role.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(roleId: string) {
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new NotFoundException(ROLE_MESSAGES.ROLE_NOT_FOUND);
    }

    return role;
  }

  async update(roleId: string, body: any) {
    await this.findOne(roleId);

    const role = await this.prisma.role.update({
      where: { id: roleId },
      data: {
        name: body.name,
        description: body.description || null,
      },
    });

    return {
      status: 200,
      message: ROLE_MESSAGES.ROLE_UPDATED,
      data: role,
    };
  }

  async delete(roleId: string) {
    await this.findOne(roleId);

    const role = await this.prisma.role.delete({
      where: { id: roleId },
    });

    return {
      status: 200,
      message: ROLE_MESSAGES.ROLE_DELETED,
      data: role,
    };
  }
}
