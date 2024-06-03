import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [PrismaModule],
})
export class UserModule {}
