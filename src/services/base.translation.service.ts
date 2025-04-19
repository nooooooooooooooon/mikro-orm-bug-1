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

  async findAll(
    language: string,
    where: FilterQuery<T> = {},
    options: FindOptions<T>
  ): Promise<T[]> {
    this.processedEntities = new WeakSet();
    const entities = await this.repository.find(where, options);
    return Promise.all(entities.map(e => this.translateEntityRecursive(e, language)));
  }

  async findOne(
    id: FilterQuery<T>,
    language: string,
    options?: FindOneOrFailOptions<T>
  ): Promise<T> {
    this.processedEntities = new WeakSet();
    const entity = await this.repository.findOneOrFail(id, options);
    return this.translateEntityRecursive(entity, language);
  }

  async create(data: CreateDto, language: string): Promise<T> {
    const entity = this.repository.create(data as any);
    await this.repository.persistAndFlush(entity);
    return this.findOne(entity.id, language);
  }

  async update(id: FilterQuery<T>, data: UpdateDto, language: string): Promise<T> {
    const entity = await this.repository.findOneOrFail(id);
    wrap(entity).assign(data as any);
    await this.repository.flush();
    return this.findOne(entity.id, language);
  }

  async delete(id: FilterQuery<T>): Promise<void> {
    const entity = await this.repository.findOneOrFail(id);
    await this.repository.removeAndFlush(entity);
  }

  protected async translateEntityRecursive(entity: any, language: string): Promise<any> {
    if (!entity || this.processedEntities.has(entity)) {
      return entity;
    }

    this.processedEntities.add(entity);

    // Handle references
    if (Reference.isReference(entity)) {
      if (!entity.isInitialized()) {
        await entity.load();
      }

      entity = entity.getEntity();
      this.processedEntities.add(entity);
    }

    // Handle translations
    if (entity.translations instanceof Collection) {
      if (!entity.translations.isInitialized()) {
        await entity.translations.init();
      }

      this.applyTranslation(entity, language);

      // Convert translations to dictionary
      // const transformed = this.transformTranslationsToDictionary(entity);
      // Object.assign(entity, transformed);
    }

    // Process relations
    const relations = Object.keys(entity).filter(prop => 
      entity[prop] instanceof Collection || 
      (typeof entity[prop] === 'object' && entity[prop] !== null)
    );

    for (const prop of relations) {
      if (entity[prop] instanceof Collection) {
        if (!entity[prop].isInitialized()) {
          await entity[prop].init();
        }
        for (const item of entity[prop].getItems()) {
          await this.translateEntityRecursive(item, language);
        }
      } else {
        await this.translateEntityRecursive(entity[prop], language);
      }
    }

    return entity;
  }

  private applyTranslation(entity: any, language: string): void {
    const translations = entity.translations.getItems();
    const translation = translations.find((t: any) => t.language === language) || translations[0];
    if (translation) {
      wrap(entity).assign(translation, { merge: true });
    }
  }

  // protected transformTranslationsToDictionary<T extends { language: string }>(entity: any): {
  //   id: number;
  //   translations: Record<string, T>;
  // } {
  //   if (!entity.translations?.isInitialized()) {
  //     return {
  //       id: entity.id,
  //       translations: {}
  //     };
  //   }

  //   console.log('->', JSON.stringify(entity.translations.indexBy('language')))

  //   return {
  //     id: entity.id,
  //     translations: entity.translations.indexBy('language')
  //   };
  // }  
}
