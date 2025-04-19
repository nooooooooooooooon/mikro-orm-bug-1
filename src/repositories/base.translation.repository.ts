import { type FilterQuery, FindOptions, FindOneOrFailOptions, wrap } from '@mikro-orm/mariadb';
import { ITranslatable } from '~/server/interfaces/translatable.interface';
import { BaseRepository } from '~/server/repositories/base.repository'

export class BaseTranslationRepository<T extends ITranslatable> extends BaseRepository<T> {
  async findOneTranslated(id: FilterQuery<T>, language: string, options: FindOneOrFailOptions<T>): Promise<T> {
    const entity = await this.findOneOrFail(id, options);
    return this.translateEntity(entity, language);
  }

  async findTranslated(where: FilterQuery<T> = {}, language: string, options: FindOptions<T>): Promise<T[]> {
    const entities = await this.find(where, options);
    return entities.map(entity => this.translateEntity(entity, language));
  }

  translateEntity(entity: T, language: string): T {
    if (!entity?.translations?.isInitialized()) {
      return entity;
    }

    const translation = entity.translations
      .getItems()
      .find(t => t.language === language) || entity.translations.getItems()[0];

    if (translation) {
      wrap(entity).assign(translation, { merge: true });
    }

    return entity;
  }
}