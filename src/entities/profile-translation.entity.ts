import { 
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
  BigIntType,
  Ref
} from '@mikro-orm/mariadb';
import { ProfileTranslationRepository } from '~/server/repositories/profile-translation.repository'
import { Profile } from './profile.entity';
import { BaseTranslationEntity } from '~/server/entities/base-translation.entity'

@Entity({ repository: () => ProfileTranslationRepository })
export class ProfileTranslation extends BaseTranslationEntity {
  [EntityRepositoryType]?: ProfileTranslationRepository

  @Property({ type: 'varchar' })
  description!: string;

  @Property({ type: 'varchar' })
  firstName!: string;

  @Property({ type: 'varchar' })
  lastName!: string;

  @ManyToOne(() => Profile, { ref: true })
  profile!: Ref<Profile>;
}