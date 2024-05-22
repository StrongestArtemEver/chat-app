import { Injectable } from '@nestjs/common';
import { Prisma, Chat } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  async createChat(data: Prisma.ChatCreateInput): Promise<Chat> {
    return this.prisma.chat.create({
      data,
    });
  }

  async getChatById(id: number): Promise<Chat | null> {
    return this.prisma.chat.findUnique({
      where: { id },
    });
  }
}
