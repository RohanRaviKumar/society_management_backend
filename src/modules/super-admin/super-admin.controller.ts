import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('super-admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
export class SuperAdminController {
  constructor(private service: SuperAdminService) {}

  @Post('create')
  createSuperAdmin(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.service.createSuperAdmin(name, email, password);
  }

  @Get('users')
  getUsers() {
    return this.service.getAllUsers();
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }
}
