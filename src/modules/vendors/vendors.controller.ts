import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role, ServiceType } from '@prisma/client';

@Controller('vendors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VendorsController {
  constructor(private service: VendorsService) {}

  @Post()
  @Roles(Role.SUPER_ADMIN)
  createVendor(
    @Body('userId') userId: string,
    @Body('serviceType') serviceType: ServiceType,
  ) {
    return this.service.createVendor(userId, serviceType);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  getAll() {
    return this.service.getAllVendors();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.HOME_OWNER)
  getById(@Param('id') id: string) {
    return this.service.getVendorById(id);
  }
}
