import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async login(data: LoginDto) {
    const response = await firstValueFrom(
      this.http.post(`${process.env.AUTH_SERVICE_URL}/auth/login`, data),
    );

    return response.data;
  }

  async register(data: RegisterDto) {
    const response = await firstValueFrom(
      this.http.post(`${process.env.AUTH_SERVICE_URL}/auth/register`, data),
    );

    return response.data;
  }

  async createRole(dto: CreateRoleDto) {
    const res = await firstValueFrom(
      this.http.post(`${process.env.AUTH_SERVICE_URL}/create-role`, dto),
    );
    return res.data;
  }

  async getRoles() {
    const res = await firstValueFrom(
      this.http.get(`${process.env.AUTH_SERVICE_URL}/roles`),
    );
    return res.data;
  }

  async updateRole(id: string, dto: UpdateRoleDto) {
    const res = await firstValueFrom(
      this.http.patch(`${process.env.AUTH_SERVICE_URL}/update-role/${id}`, dto),
    );
    return res.data;
  }

  async deleteRole(id: string) {
    const res = await firstValueFrom(
      this.http.delete(`${process.env.AUTH_SERVICE_URL}/delete-role/${id}`),
    );
    return res.data;
  }
}
