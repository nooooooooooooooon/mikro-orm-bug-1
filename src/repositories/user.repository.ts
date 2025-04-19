import { EntityRepository } from '@mikro-orm/mariadb'
// import { BaseTranslationRepository } from '~/server/repositories/base.translation.repository'
import { BaseRepository } from '~/server/repositories/base.repository'
import { User } from '~/server/entities/user.entity'

export class UserRepository extends BaseRepository<User> {} // BaseTranslationRepository<User> {}