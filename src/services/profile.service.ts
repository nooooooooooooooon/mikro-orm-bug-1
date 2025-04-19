import { Inject, Injectable } from '@nestjs/common';
import { ProfileRepository } from '~/server/repositories/profile.repository';
import { Profile } from '~/server/entities/profile.entity';
import { BaseTranslationService } from '~/server/services/base.translation.service';
import { EntityManager } from '@mikro-orm/core';
import { CreateProfileDto } from '~/server/dto/nested-translation.dto'

@Injectable()
export class ProfileService extends BaseTranslationService<Profile, CreateProfileDto, Partial<CreateProfileDto>> {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
  ) {
    super(profileRepository, entityManager);
  }
}