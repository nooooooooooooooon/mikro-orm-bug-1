/**
 * @file
 */

import { 
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  OneToOne,
  Property,
  Ref,
  StringType
} from '@mikro-orm/mariadb'
import { UserRepository } from '~/server/repositories/user.repository'
import { Profile } from './profile.entity'
// import { UserTranslation } from './user-translation.entity'
// import { ITranslatable } from '~/server/interfaces/translatable.interface'
import { BaseEntity, Worker } from '~/server/entities'

@Entity({
  collection: 'user',
  repository: () => UserRepository,
  tableName: 'user',
})
export class User extends BaseEntity { // implements ITranslatable<UserTranslation> {
  [EntityRepositoryType]?: UserRepository

  @Property({
    type: StringType,
    unique: true,
  })
  email!: string

  @Property({ type: StringType })
  password!: string

  @OneToOne(
    () => Profile,
    profile => profile.user,
    { owner: true, ref: true }
  )
  profile?: Ref<Profile>

  @OneToOne(
    () => Worker,
    worker => worker.user,
    { owner: true, ref: true }
  )
  worker?: Ref<Worker>

  // @OneToMany(
  //   () => UserTranslation,
  //   translation => translation.user,
  //   { eager: true, serializer: value => value.indexBy('language') }
  // )
  // translations = new Collection<UserTranslation>(this)
}
