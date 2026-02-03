import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ServiceType } from '@prisma/client';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async createVendor(userId: string, serviceType: ServiceType) {
    return this.prisma.vendorProfile.create({
      data: {
        userId,
        serviceType,
      },
    });
  }

  async getAllVendors() {
    return this.prisma.vendorProfile.findMany({
      include: { user: true },
    });
  }

  async getVendorById(id: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { id },
      include: { user: true, ratings: true },
    });

    if (!vendor) throw new NotFoundException('Vendor not found');
    return vendor;
  }
}
