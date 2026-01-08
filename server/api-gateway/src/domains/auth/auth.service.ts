import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { AUTH_ENDPOINTS } from './constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) { }

  async login(data: LoginDto) {
    const { email, password } = data;
    const response = await firstValueFrom(
      this.http.post(`${process.env.AUTH_SERVICE_URL}${AUTH_ENDPOINTS.LOGIN}`, {
        email,
        password,
      }),
    );
    return response.data;
  }

  async register(data: RegisterDto) {
    const { firstName, lastName, phone, email, password } = data;
    const response = await firstValueFrom(
      this.http.post(`${process.env.AUTH_SERVICE_URL}${AUTH_ENDPOINTS.REGISTER}`, {
        firstName,
        lastName,
        phone,
        email,
        password,
      }),
    );
    return response.data;
  }

  async createRole(dto: CreateRoleDto) {
    const res = await firstValueFrom(
      this.http.post(`${process.env.AUTH_SERVICE_URL}${AUTH_ENDPOINTS.ROLES}`, dto),
    );
    return res.data;
  }

  async getRoles() {
    const res = await firstValueFrom(
      this.http.get(`${process.env.AUTH_SERVICE_URL}${AUTH_ENDPOINTS.ROLES}`),
    );
    return res.data;
  }

  async updateRole(id: number, dto: UpdateRoleDto) {
    const res = await firstValueFrom(
      this.http.patch(`${process.env.AUTH_SERVICE_URL}${AUTH_ENDPOINTS.ROLES}/${id}`, dto),
    );
    return res.data;
  }

  async deleteRole(id: number) {
    const res = await firstValueFrom(
      this.http.delete(`${process.env.AUTH_SERVICE_URL}${AUTH_ENDPOINTS.ROLES}/${id}`),
    );
    return res.data;
  }
}
