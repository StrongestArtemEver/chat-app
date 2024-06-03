import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MessagesController],
  imports: [PrismaModule],
  providers: [MessagesService, PrismaService],
})
export class MessagesModule {}
