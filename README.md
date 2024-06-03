Конечно, вот полная документация для вашего проекта мессенджера на основе NestJS и Prisma.

---

# Документация проекта мессенджера

## Описание
Приложение мессенджера, созданное с использованием NestJS и Prisma. Оно включает функциональность для управления пользователями, чатами и сообщениями.

## Структура проекта

```
messenger-app
├── src
│   ├── app.module.ts
│   ├── main.ts
│   ├── prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── users
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   └── users.controller.ts
│   ├── chats
│   │   ├── chats.module.ts
│   │   ├── chats.service.ts
│   │   └── chats.controller.ts
│   └── messages
│       ├── messages.module.ts
│       ├── messages.service.ts
│       └── messages.controller.ts
├── prisma
│   ├── schema.prisma
└── package.json
```

## Схема базы данных

<img src="./src/prisma/image.png" alt="Схема базы данных" >

## Установка и запуск

### Требования
- Node.js
- PostgreSQL

### Шаги установки

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/your-repo/messenger-app.git
   cd messenger-app
   ```

2. **Установите зависимости**
   ```bash
   npm install
   ```

3. **Настройте базу данных**
   Создайте файл `.env` в корне проекта и добавьте следующую строку, заменив значение на ваше подключение к базе данных PostgreSQL:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   ```

4. **Инициализация Prisma**
   ```bash
   npx prisma init
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Запуск приложения**
   ```bash
   npm run start
   ```

## Структура каталогов и файлов

### `src/main.ts`
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### `src/app.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ChatsModule,
    MessagesModule,
  ],
})
export class AppModule {}
```

### `src/prisma/prisma.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

### `src/prisma/prisma.service.ts`
```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

### `src/users/users.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
```

### `src/users/users.service.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
```

### `src/users/users.controller.ts`
```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getUserById(Number(id));
  }
}
```

### `src/chats/chats.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
```

### `src/chats/chats.service.ts`
```typescript
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
```

### `src/chats/chats.controller.ts`
```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { Chat, Prisma } from '@prisma/client';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  async createChat(@Body() data: Prisma.ChatCreateInput): Promise<Chat> {
    return this.chatsService.createChat(data);
  }
}
```

### `src/messages/messages.module.ts`
```typescript
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
```

### `src/messages/messages.service.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { Prisma, Message } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async createMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    return this.prisma.message.create({
      data,
    });
  }

  async getMessagesByChatId(chatId: number): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { chatId },
      include: { user: true },
    });
  }
}
```

### `src/messages/messages.controller.ts`
```typescript
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() data: Prisma.MessageCreateInput): Promise<Message> {
    return this.messagesService.createMessage(data);
  }

  @Get('chat/:chatId')
  async getMessagesByChatId(@Param('chatId') chatId: string): Promise<Message[]> {
    return this.messagesService.getMessagesByChatId(Number(chatId));
  }
}
```

## Prisma схема

### `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              Int               @id @default(autoincrement()) @map("id")
  username        String            @unique @map("username")
  email           String            @unique @map("email")
  password        String            @map("password")
  messages        Message[]
  chats           Chat[]            @relation("ChatParticipants")
  ChatParticipant ChatParticipant[]

  @@map("users")
}

model Chat {
  id              Int               @id @default(autoincrement()) @map("id")
  name            String?           @map("name")
  messages        Message[]
  participants    User[]            @relation("

ChatParticipants")
  ChatParticipant ChatParticipant[]

  @@map("chats")
}

model Message {
  id        Int      @id @default(autoincrement()) @map("id")
  content   String   @map("content")
  createdAt DateTime @default(now()) @map("created_at")
  chatId    Int      @map("chat_id")
  chat      Chat     @relation(fields: [chatId], references: [id])
  userId    Int      @map("user_id")
  user      User     @relation(fields: [userId], references: [id])

  @@map("messages")
}

model ChatParticipant {
  chatId   Int
  chat     Chat     @relation(fields: [chatId], references: [id])
  userId   Int
  user     User     @relation(fields: [userId], references: [id])
  joinedAt DateTime @default(now()) @map("joined_at")

  @@id([chatId, userId])
  @@map("chat_participants")
}
```

## API Документация

### Пользователи

#### Создание пользователя
**Endpoint:** `POST /users`

**Тело запроса:**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Ответ:**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "messages": [],
  "chats": [],
  "ChatParticipant": []
}
```

#### Получение пользователя по ID
**Endpoint:** `GET /users/:id`

**Ответ:**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "messages": [],
  "chats": [],
  "ChatParticipant": []
}
```

### Чаты

#### Создание чата
**Endpoint:** `POST /chats`

**Тело запроса:**
```json
{
  "name": "General Chat",
  "participants": {
    "connect": [{ "id": 1 }]
  }
}
```

**Ответ:**
```json
{
  "id": 1,
  "name": "General Chat",
  "messages": [],
  "participants": [
    {
      "id": 1,
      "username": "johndoe",
      "email": "johndoe@example.com",
      "password": "securepassword"
    }
  ],
  "ChatParticipant": []
}
```

#### Получение чата по ID
**Endpoint:** `GET /chats/:id`

**Ответ:**
```json
{
  "id": 1,
  "name": "General Chat",
  "messages": [],
  "participants": [
    {
      "id": 1,
      "username": "johndoe",
      "email": "johndoe@example.com",
      "password": "securepassword"
    }
  ],
  "ChatParticipant": []
}
```

### Сообщения

#### Создание сообщения
**Endpoint:** `POST /messages`

**Тело запроса:**
```json
{
  "content": "Hello, world!",
  "chatId": 1,
  "userId": 1
}
```

**Ответ:**
```json
{
  "id": 1,
  "content": "Hello, world!",
  "createdAt": "2024-05-21T00:00:00.000Z",
  "chatId": 1,
  "userId": 1
}
```

#### Получение сообщений по ID чата
**Endpoint:** `GET /messages/chat/:chatId`

**Ответ:**
```json
[
  {
    "id": 1,
    "content": "Hello, world!",
    "createdAt": "2024-05-21T00:00:00.000Z",
    "chatId": 1,
    "userId": 1,
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "johndoe@example.com",
      "password": "securepassword"
    }
  }
]
```

---

Эта документация охватывает установку, настройку, структуру и основные конечные точки вашего проекта мессенджера на NestJS и Prisma. Если у вас есть дополнительные вопросы или потребности, не стесняйтесь задавать их!
