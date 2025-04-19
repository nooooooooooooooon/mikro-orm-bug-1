/**
 * @file
 */

import {
  BaseEntity,
  BigIntType,
  Cascade,
  Collection,
  DateTimeType,
  Entity,
  EntityRepositoryType,
  HiddenProps,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  StringType,
  type Ref
} from '@mikro-orm/mariadb'
import { WorkerRepository } from '~/server/repositories/worker.repository'
import { WorkerTranslation, User } from '~/server/entities'

@Entity({
  collection: 'worker',
  repository: () => WorkerRepository,
  tableName: 'worker',
})
export class Worker extends BaseEntity {
  [EntityRepositoryType]?: WorkerRepository

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

  @OneToOne(
    () => User,
    user => user.worker,
    { ref: true }
  )
  user?: Ref<User>

  @OneToMany(
    () => WorkerTranslation,
    translation => translation.worker,
    { eager: true, serializer: value => value.indexBy('language') }
  )
  translations = new Collection<WorkerTranslation>(this)
}
