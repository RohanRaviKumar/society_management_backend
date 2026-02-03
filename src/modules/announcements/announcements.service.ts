import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  async create(societyId: string, postedById: string, title: string, content: string) {
    return this.prisma.announcement.create({
      data: {
        societyId,
        postedById,
        title,
        content,
      },
    });
  }

  async getSocietyAnnouncements(societyId: string) {
    return this.prisma.announcement.findMany({
      where: { societyId },
      include: { postedBy: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
