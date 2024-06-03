// import { Injectable } from '@nestjs/common';
// // import { InjectRedis, Redis } from 'nestjs-ioredis';

// @Injectable()
// export class AppService {
//   constructor(@InjectRedis() private readonly redis: Redis) {}

//   async setValue(key: string, value: string) {
//     await this.redis.set(key, value);
//   }

//   async getValue(key: string): Promise<string> {
//     return await this.redis.get(key);
//   }
// }
