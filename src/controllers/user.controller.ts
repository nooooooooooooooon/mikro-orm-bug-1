// user.controller.ts
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { UserService } from '~/server/services/user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    readonly userService: UserService
  ) {}

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('lang') lang = 'en'
  ) {
    // Will automatically handle User → Profile → Phone translations
    return this.userService.findOne(
      id,
      { populate: [
        'worker.user.profile', 
        'worker.user.profile.phones',
      ] as any }
    );
  }
}
