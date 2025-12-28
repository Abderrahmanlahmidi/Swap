import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorators';
import { UserRole } from '../../enums/user-role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  @Post('roles')
  createRole(@Body() dto: CreateRoleDto) {
    return this.authService.createRole(dto);
  }

  @Get('roles')
  getRoles() {
    return this.authService.getRoles();
  }

  @Patch('roles/:id')
  updateRole(@Param('id') id: number, @Body() dto: UpdateRoleDto) {
    return this.authService.updateRole(id, dto);
  }

  @Delete('roles/:id')
  deleteRole(@Param('id') id: number) {
    return this.authService.deleteRole(id);
  }
}
