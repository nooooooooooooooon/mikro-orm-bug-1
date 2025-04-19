import { 
  BigIntType, 
  Collection, 
  Entity, 
  EntityRepositoryType,
  ManyToOne,
  OneToMany,
  PrimaryKey, 
  Property,
  Ref
} from '@mikro-orm/mariadb';
import { Profile } from './profile.entity';
import { ITranslatable } from '../interfaces/translatable.interface';
import { PhoneRepository } from '~/server/repositories/phone.repository'
import { PhoneTranslation } from '~/server/entities/phone-translation.entity'
import { BaseEntity } from '~/server/entities/base.entity'

@Entity({ repository: () => PhoneRepository })
export class Phone extends BaseEntity implements ITranslatable<PhoneTranslation> {
  [EntityRepositoryType]?: PhoneRepository
  
  @Property({ type: 'varchar' })
  number!: string;

  @ManyToOne(() => Profile, { ref: true })
  profile!: Ref<Profile>;

  @OneToMany(
    () => PhoneTranslation,
    translation => translation.phone,
    { eager: true, serializer: value => value.indexBy('language') }
  )
  translations = new Collection<PhoneTranslation>(this);
}