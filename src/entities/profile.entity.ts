// entities/profile.entity.ts
import { 
  BigIntType,
  BooleanType,
  Collection, 
  Entity,
  EntityRepositoryType,
  OneToMany,
  OneToOne,
  PrimaryKey, 
  Property, 
  Ref,
  ManyToOne
} from '@mikro-orm/mariadb';
import { ProfileRepository } from '~/server/repositories/profile.repository'
import { User } from './user.entity';
import { Phone } from './phone.entity';
import { ITranslatable } from '../interfaces/translatable.interface';
import { ProfileTranslation } from '~/server/entities/profile-translation.entity'
import { BaseEntity } from '~/server/entities/base.entity'

@Entity({ repository: () => ProfileRepository })
export class Profile extends BaseEntity implements ITranslatable<ProfileTranslation> {
  [EntityRepositoryType]?: ProfileRepository

  @Property({ type: BooleanType })
  active!: boolean;

  @OneToOne(() => User, user => user.profile, { ref: true })
  user?: Ref<User>;

  @OneToMany(() => Phone, phone => phone.profile, { eager: true })
  phones = new Collection<Phone>(this);

  @OneToMany(
    () => ProfileTranslation,
    translation => translation.profile,
    { eager: true, serializer: value => value.indexBy('language') }
  )
  translations = new Collection<ProfileTranslation>(this);
}