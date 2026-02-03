import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class AmenitiesService {
  constructor(private prisma: PrismaService) {}

  // ADMIN creates amenity
  async createAmenity(
    societyId: string,
    name: string,
    description?: string,
  ) {
    return this.prisma.amenity.create({
      data: {
        societyId,
        name,
        description,
      },
    });
  }

  async getSocietyAmenities(societyId: string) {
    return this.prisma.amenity.findMany({
      where: { societyId },
      include: { bookings: true },
    });
  }

  // HOME OWNER books amenity
  async bookAmenity(
    amenityId: string,
    userId: string,
    startTime: Date,
    endTime: Date,
  ) {
    return this.prisma.amenityBooking.create({
      data: {
        amenityId,
        userId,
        startTime,
        endTime,
      },
    });
  }

  // ADMIN approves/rejects booking
  async updateBookingStatus(
    bookingId: string,
    status: BookingStatus,
  ) {
    const booking = await this.prisma.amenityBooking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) throw new NotFoundException('Booking not found');

    return this.prisma.amenityBooking.update({
      where: { id: bookingId },
      data: { status },
    });
  }

  async getSocietyBookings(societyId: string) {
    return this.prisma.amenityBooking.findMany({
      where: {
        amenity: { societyId },
      },
      include: {
        amenity: true,
        user: true,
      },
      orderBy: { startTime: 'asc' },
    });
  }
}
