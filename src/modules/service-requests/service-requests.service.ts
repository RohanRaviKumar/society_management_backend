import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RequestStatus } from '@prisma/client';

@Injectable()
export class ServiceRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(homeownerId: string, title: string, description: string) {
    return this.prisma.serviceRequest.create({
      data: {
        homeownerId,
        title,
        description,
      },
    });
  }

  async assignVendor(requestId: string, vendorId: string, adminId: string) {
    return this.prisma.serviceRequest.update({
      where: { id: requestId },
      data: {
        vendorId,
        adminId,
        status: RequestStatus.ASSIGNED,
      },
    });
  }

  async updateStatus(requestId: string, status: RequestStatus) {
    return this.prisma.serviceRequest.update({
      where: { id: requestId },
      data: { status },
    });
  }

  async getSocietyRequests(societyId: string) {
    return this.prisma.serviceRequest.findMany({
      where: {
        homeowner: { societyId },
      },
      include: {
        homeowner: true,
        vendor: { include: { user: true } },
      },
    });
  }

  async rateRequest(
    requestId: string,
    vendorId: string,
    score: number,
    comment: string,
  ) {
    return this.prisma.rating.create({
      data: {
        requestId,
        vendorId,
        score,
        comment,
      },
    });
  }
}
