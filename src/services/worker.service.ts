import { Inject, Injectable } from '@nestjs/common';
import { WorkerRepository } from '~/server/repositories/worker.repository';
import { Worker } from '~/server/entities/worker.entity';
import { BaseTranslationService } from '~/server/services/base.translation.service';
import { EntityManager } from '@mikro-orm/core';
import { CreateWorkerDto } from '~/server/dto/nested-translation.dto'

@Injectable()
export class WorkerService extends BaseTranslationService<Worker, CreateWorkerDto, Partial<CreateWorkerDto>> {
  constructor(
    @Inject(WorkerRepository)
    private readonly workerRepository: WorkerRepository,
    @Inject(EntityManager)
    private readonly entityManager: EntityManager,
  ) {
    super(workerRepository, entityManager);
  }
}