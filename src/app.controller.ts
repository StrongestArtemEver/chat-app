import { Controller, Get, Query } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // @Get('set')
  // async setValue(@Query('key') key: string, @Query('value') value: string) {
  //   await this.appService.setValue(key, value);
  //   return `Set ${key} to ${value}`;
  // }

  // @Get('get')
  // async getValue(@Query('key') key: string) {
  //   const value = await this.appService.getValue(key);
  //   return `Value for ${key} is ${value}`;
  // }
}
