import { Controller, Post, Body, HttpException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() body: any) {
    try {
      await this.authService.register(body);
      return { status: 201, message: 'User registered successfully' };
    } catch (error) {
      throw new HttpException(
        { status: 500, message: 'Internal server error' },
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
}
