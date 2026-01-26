import { Controller, Post, Body, HttpException, Res, Get, UseGuards, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('register')
  async register(@Body() body: any) {
    try {
      await this.authService.register(body);
      return { status: 201, message: 'User registered successfully' };
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { status: 500, message: error.message || 'Internal server error' },
        500,
      );
    }
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, userId, role } =
      await this.authService.login(body.email, body.password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      status: 200,
      message: 'Login successful',
      user: {
        id: userId,
        role,
      },
      accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@GetUser('id') userId: string) {
    return this.authService.getMe(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(@GetUser('id') userId: string, @Body() body: any) {
    return this.authService.updateProfile(userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(
    @GetUser('id') userId: string,
    @Body() body: { oldPass: string; newPass: string },
  ) {
    return this.authService.changePassword(userId, body.oldPass, body.newPass);
  }
}

