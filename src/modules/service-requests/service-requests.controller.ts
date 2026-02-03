import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role, RequestStatus } from '@prisma/client';

@Controller('requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiceRequestsController {
  constructor(private service: ServiceRequestsService) {}

  @Post()
  @Roles(Role.HOME_OWNER)
  create(
    @CurrentUser() user,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.service.create(user.id, title, description);
  }

  @Patch(':id/assign/:vendorId')
  @Roles(Role.ADMIN)
  assign(
    @Param('id') id: string,
    @Param('vendorId') vendorId: string,
    @CurrentUser() user,
  ) {
    return this.service.assignVendor(id, vendorId, user.id);
  }

  @Patch(':id/status')
  @Roles(Role.VENDOR)
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: RequestStatus,
  ) {
    return this.service.updateStatus(id, status);
  }

  @Get('society/:societyId')
  @Roles(Role.ADMIN)
  getSociety(@Param('societyId') societyId: string) {
    return this.service.getSocietyRequests(societyId);
  }

  @Post(':id/rate')
  @Roles(Role.HOME_OWNER)
  rate(
    @Param('id') id: string,
    @Body('vendorId') vendorId: string,
    @Body('score') score: number,
    @Body('comment') comment: string,
  ) {
    return this.service.rateRequest(id, vendorId, score, comment);
  }
}
