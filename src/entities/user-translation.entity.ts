  import { 
    Entity,
    EntityRepositoryType,
    ManyToOne, 
    PrimaryKey, 
    Property, 
    BigIntType,
    Ref
  } from '@mikro-orm/mariadb';
  import { UserTranslationRepository } from '~/server/repositories/user-translation.repository'
  import { User } from './user.entity';
  import { BaseTranslationEntity } from '~/server/entities/base-translation.entity'

  @Entity({ repository: () => UserTranslationRepository })
  export class UserTranslation extends BaseTranslationEntity {
    [EntityRepositoryType]?: UserTranslationRepository

    @Property({ type: 'varchar' })
    description!: string;
  
    @Property({ type: 'varchar' })
    firstName!: string;
  
    @Property({ type: 'varchar' })
    lastName!: string;

    @ManyToOne(() => User, { ref: true })
    user!: Ref<User>;
  }