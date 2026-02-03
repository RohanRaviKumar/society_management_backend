import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role, BookingStatus } from '@prisma/client';

@Controller('amenities')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AmenitiesController {
  constructor(private service: AmenitiesService) {}

  // ADMIN create amenity
  @Post(':societyId')
  @Roles(Role.ADMIN)
  createAmenity(
    @Param('societyId') societyId: string,
    @Body('name') name: string,
    @Body('description') description?: string,
  ) {
    return this.service.createAmenity(societyId, name, description);
  }

  @Get(':societyId')
  @Roles(Role.ADMIN, Role.HOME_OWNER)
  getSocietyAmenities(@Param('societyId') societyId: string) {
    return this.service.getSocietyAmenities(societyId);
  }

  // HOME OWNER book
  @Post('book/:amenityId')
  @Roles(Role.HOME_OWNER)
  bookAmenity(
    @Param('amenityId') amenityId: string,
    @CurrentUser() user,
    @Body('startTime') startTime: string,
    @Body('endTime') endTime: string,
  ) {
    return this.service.bookAmenity(
      amenityId,
      user.id,
      new Date(startTime),
      new Date(endTime),
    );
  }

  // ADMIN approve/reject
  @Patch('booking/:bookingId')
  @Roles(Role.ADMIN)
  updateStatus(
    @Param('bookingId') bookingId: string,
    @Body('status') status: BookingStatus,
  ) {
    return this.service.updateBookingStatus(bookingId, status);
  }

  @Get('bookings/:societyId')
  @Roles(Role.ADMIN)
  getBookings(@Param('societyId') societyId: string) {
    return this.service.getSocietyBookings(societyId);
  }
}
