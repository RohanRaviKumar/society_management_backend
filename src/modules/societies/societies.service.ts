import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class SocietiesService {
  constructor(private prisma: PrismaService) {}

  async createSociety(name: string) {
    return this.prisma.society.create({
      data: { name },
    });
  }

  async getAllSocieties() {
    return this.prisma.society.findMany({
      include: {
        users: true,
        amenities: true,
        announcements: true,
      },
    });
  }

  async assignAdmin(societyId: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    if (user.role !== Role.ADMIN)
      throw new ForbiddenException('User is not ADMIN');

    return this.prisma.user.update({
      where: { id: userId },
      data: { societyId },
    });
  }

  async approveVendor(societyId: string, vendorId: string) {
    return this.prisma.societyVendor.upsert({
      where: {
        societyId_vendorId: {
          societyId,
          vendorId,
        },
      },
      update: { approved: true },
      create: {
        societyId,
        vendorId,
        approved: true,
      },
    });
  }

  async getSocietyVendors(societyId: string) {
    return this.prisma.societyVendor.findMany({
      where: { societyId, approved: true },
      include: {
        vendor: {
          include: { user: true },
        },
      },
    });
  }
}
