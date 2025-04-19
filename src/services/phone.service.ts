// services/phone.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { PhoneRepository } from '~/server/repositories/phone.repository';
import { Phone } from '~/server/entities/phone.entity';
import { BaseTranslationService } from '~/server/services/base.translation.service';
import { EntityManager } from '@mikro-orm/core';
import { CreatePhoneDto } from '~/server/dto/nested-translation.dto'

@Injectable()
export class PhoneService extends BaseTranslationService<Phone, CreatePhoneDto, Partial<CreatePhoneDto>> {
  constructor(
    @Inject(PhoneRepository)
    private readonly phoneRepository: PhoneRepository,
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
  ) {
    super(phoneRepository, entityManager);
  }
}
