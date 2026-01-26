import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AUTH_MESSAGES, JWT_CONFIG, ROLES } from './constants/auth.constants';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  image?: string;
}


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(data: RegisterData) {
    const { firstName, lastName, email, password, phone } = data;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException(AUTH_MESSAGES.USER_ALREADY_EXISTS);
    }

    const role = await this.prisma.role.findUnique({
      where: { name: ROLES.CLIENT },
    });

    if (!role) {
      throw new BadRequestException(AUTH_MESSAGES.DEFAULT_ROLE_NOT_FOUND);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        password: hashedPassword,
        phone,
        roleId: role.id,
      },
      include: {
        role: true,
      },
    });

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role.name,
      } as any,
      { expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRATION },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id } as any,
      { expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRATION },
    );

    return {
      userId: user.id,
      role: user.role.name,
      accessToken,
      refreshToken,
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });
    if (!user) throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: string, data: UpdateProfileData) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
      include: { role: true },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async changePassword(userId: string, oldPass: string, newPass: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException(AUTH_MESSAGES.INVALID_CREDENTIALS);

    const isValid = await bcrypt.compare(oldPass, user.password);
    if (!isValid) throw new BadRequestException('Current password does not match');

    const hashedPassword = await bcrypt.hash(newPass, 12);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return { message: 'Password updated successfully' };
  }
}

