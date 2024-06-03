import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MessagesService, PrismaService],
  controllers: [MessagesController],
})
export class MessagesModule {}
