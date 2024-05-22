import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Chat, Prisma } from '@prisma/client';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(@Body() data: Prisma.ChatCreateInput): Promise<Chat> {
    return this.chatsService.createChat(data);
  }

  @Get(':id')
  async getChatById(@Param('id') id: string): Promise<Chat | null> {
    return this.chatsService.getChatById(Number(id));
  }
}
