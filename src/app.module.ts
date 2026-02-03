import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { SocietiesModule } from './modules/societies/societies.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { ServiceRequestsModule } from './modules/service-requests/service-requests.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { AmenitiesModule } from './modules/amenities/amenities.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    SocietiesModule,
    SuperAdminModule,
    VendorsModule,
    ServiceRequestsModule,
    AnnouncementsModule,
    AmenitiesModule,
  ],
})
export class AppModule {}

