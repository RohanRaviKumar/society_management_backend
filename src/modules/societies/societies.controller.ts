import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SocietiesService } from './societies.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('societies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocietiesController {
  constructor(private societiesService: SocietiesService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  createSociety(@Body('name') name: string) {
    return this.societiesService.createSociety(name);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  getAll() {
    return this.societiesService.getAllSocieties();
  }

  @Post(':id/assign-admin/:userId')
  @Roles(Role.SUPER_ADMIN)
  assignAdmin(
    @Param('id') societyId: string,
    @Param('userId') userId: string,
  ) {
    return this.societiesService.assignAdmin(societyId, userId);
  }

  @Post(':id/approve-vendor/:vendorId')
  @Roles(Role.ADMIN)
  approveVendor(
    @Param('id') societyId: string,
    @Param('vendorId') vendorId: string,
  ) {
    return this.societiesService.approveVendor(societyId, vendorId);
  }

  @Get(':id/vendors')
  @Roles(Role.ADMIN, Role.HOME_OWNER)
  getVendors(@Param('id') societyId: string) {
    return this.societiesService.getSocietyVendors(societyId);
  }
}
