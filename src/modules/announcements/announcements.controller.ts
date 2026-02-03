import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('announcements')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnnouncementsController {
  constructor(private service: AnnouncementsService) {}

  @Post(':societyId')
  @Roles(Role.ADMIN)
  create(
    @Param('societyId') societyId: string,
    @CurrentUser() user,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.service.create(societyId, user.id, title, content);
  }

  @Get(':societyId')
  @Roles(Role.ADMIN, Role.HOME_OWNER)
  getAll(@Param('societyId') societyId: string) {
    return this.service.getSocietyAnnouncements(societyId);
  }
}
