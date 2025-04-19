import { Injectable } from '@nestjs/common';
import { ITranslatable } from '~/server/interfaces/translatable.interface';
import { BaseTranslationRepository } from '~/server/repositories/base.translation.repository';
import { Collection, EntityData, FilterQuery, wrap, LoadStrategy, EntityManager, Reference, FindOptions, FindOneOrFailOptions } from '@mikro-orm/core';

export abstract class BaseTranslationService<
  T extends ITranslatable,
  CreateDto = any,
  UpdateDto = any
> {
  private processedEntities = new WeakSet();

  constructor(
    private readonly repository: BaseTranslationRepository<T>,
    protected readonly em: EntityManager
  ) {}
}
