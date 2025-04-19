// user.module.ts
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from '~/server/entities/user.entity';
import { UserTranslation } from '~/server/entities/user-translation.entity';
import { Profile } from '~/server/entities/profile.entity';
import { ProfileTranslation } from '~/server/entities/profile-translation.entity';
import { Phone } from '~/server/entities/phone.entity';
import { PhoneTranslation } from '~/server/entities/phone-translation.entity';
import { UserService } from '~/server/services/user.service';
import { ProfileService } from '~/server/services/profile.service';
import { PhoneService } from '~/server/services/phone.service';
import { UserController } from '~/server/controllers/user.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      User,
      UserTranslation,
      Profile,
      ProfileTranslation,
      Phone,
      PhoneTranslation
    ])
  ],
  providers: [
    UserService,
    ProfileService,
    PhoneService,
  ],
  controllers: [UserController],
  exports: [
    UserService,
    ProfileService,
    PhoneService,
  ],
})
export class UserModule {}