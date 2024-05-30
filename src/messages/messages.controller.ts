import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message, Prisma } from '@prisma/client';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(
    @Body() data: Prisma.MessageCreateInput,
  ): Promise<Message> {
    return this.messagesService.createMessage(data);
  }

  @Get(':id')
  async getMessagesByChatId(
    @Param('id') id: string,
  ): Promise<Message[] | null> {
    return this.messagesService.getMessageByChatId(Number(id));
  }
}
