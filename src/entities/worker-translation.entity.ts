/**
 * @file
 */

import {
  BaseEntity,
  BigIntType,
  DateTimeType,
  Entity,
  EntityRepositoryType,
  HiddenProps,
  ManyToOne,
  PrimaryKey,
  Property,
  StringType,
  type Ref
} from '@mikro-orm/mariadb'
import { WorkerTranslationRepository } from '~/server/repositories/worker-translation.repository'
import { Worker } from '~/server/entities'

@Entity({
  collection: 'worker-translation',
  repository: () => WorkerTranslationRepository,
  tableName: 'worker_translation',
})
export class WorkerTranslation extends BaseEntity {
  [EntityRepositoryType]?: WorkerTranslationRepository

  [HiddenProps]?: 'deletedAt'

  @Property({
    hidden: true,
    nullable: true,
    onCreate: () => new Date(),
    type: DateTimeType,
  })
  createdAt?: Date | string

  @Property({
    hidden: true,
    nullable: true,
    type: DateTimeType,
  })
  deletedAt?: Date | string

  @Property({
    length: 250,
    nullable: true,
    type: StringType,
  })
  description?: string

  @PrimaryKey({
    type: new BigIntType('number'),
  })
  id?: number

  @Property({
    length: 250,
    type: StringType,
    unique: true,
  })
  slug!: string

  @Property({
    hidden: true,
    nullable: true,
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
    type: DateTimeType,
  })
  updatedAt?: Date | string

  @ManyToOne(() => Worker, { ref: true })
  worker!: Ref<Worker>;
}
