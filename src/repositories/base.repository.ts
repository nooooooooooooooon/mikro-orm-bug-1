/**
 * @file
 */

import { AnyEntity, EntityManager, EntityRepository } from '@mikro-orm/mariadb'

export class BaseRepository<T extends object> extends EntityRepository<T> {
  public persist(entity: AnyEntity | AnyEntity[]): EntityManager {
    return this.em.persist(entity);
  }

  public async persistAndFlush(entity: AnyEntity | AnyEntity[]): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

  public remove(entity: AnyEntity): EntityManager {
    return this.em.remove(entity);
  }

  public async removeAndFlush(entity: AnyEntity): Promise<void> {
    await this.em.removeAndFlush(entity);
  }

  public async flush(): Promise<void> {
    return this.em.flush();
  }
}
