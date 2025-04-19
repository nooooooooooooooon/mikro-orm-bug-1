import { MariaDbDriver } from '@mikro-orm/mariadb'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common';
import { UserModule } from '~/server/modules/user.module';
import { BaseTranslationEntity } from '~/server/entities/base-translation.entity'
import { BaseEntity } from '~/server/entities/base.entity'
import { PhoneTranslation } from '~/server/entities/phone-translation.entity'
import { Phone } from '~/server/entities/phone.entity'
import { ProfileTranslation } from '~/server/entities/profile-translation.entity'
import { Profile } from '~/server/entities/profile.entity'
import { UserTranslation } from '~/server/entities/user-translation.entity'
import { User } from '~/server/entities/user.entity'
import { WorkerTranslation } from '~/server/entities/worker-translation.entity'
import { Worker } from '~/server/entities/worker.entity'

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        allowGlobalContext: false,
        autoLoadEntities: true,
        dbName: 'test3',
        debug: true,
        disableIdentityMap: true,
        discovery: {
          warnWhenNoEntities: true,
        },
        driver: MariaDbDriver,
        password: '123456',
        populateAfterFlush: true,
        // port: 3600,
        // registerRequestContext: true,
        tsNode: true,
        user: 'root',
      }),
    }),
    MikroOrmModule.forFeature([
      // BaseEntity,
      // BaseTranslationEntity,
      PhoneTranslation, 
      Phone, 
      ProfileTranslation, 
      Profile, 
      UserTranslation, 
      User, 
      WorkerTranslation, 
      Worker,
    ]),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
