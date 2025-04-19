import { 
  Entity, 
  EntityRepositoryType,
  ManyToOne, 
  PrimaryKey, 
  Property, 
  BigIntType,
  Ref
} from '@mikro-orm/mariadb';
import { PhoneTranslationRepository } from '~/server/repositories/phone-translation.repository'

import { Phone } from './phone.entity';
import { BaseTranslationEntity } from '~/server/entities/base-translation.entity'

@Entity({ repository: () => PhoneTranslationRepository })
export class PhoneTranslation extends BaseTranslationEntity {
  [EntityRepositoryType]?: PhoneTranslationRepository

  @Property({ type: 'varchar' })
  description!: string;

  @ManyToOne(() => Phone, { ref: true })
  phone!: Ref<Phone>;
}