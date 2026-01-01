import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(body: any) {
    const { name, description } = body;

    if (!name) {
      throw new BadRequestException('Role name is required');
    }

    const exists = await this.prisma.role.findUnique({
      where: { name },
    });

    if (exists) {
      throw new BadRequestException('Role already exists');
    }

    const role = await this.prisma.role.create({
      data: {
        name,
        description: description || null,
      },
    });

    return {
      status: 201,
      message: 'Role created successfully',
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
      throw new NotFoundException('Role not found');
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
      message: 'Role updated successfully',
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
      message: 'Role deleted successfully',
      data: role,
    };
  }
}
