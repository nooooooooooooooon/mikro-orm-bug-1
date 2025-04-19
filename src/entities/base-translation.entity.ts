import { BigIntType, PrimaryKey, Property } from '@mikro-orm/mariadb';

export abstract class BaseTranslationEntity {
  @PrimaryKey({ type: BigIntType })
  id!: string;

  @Property({ type: 'varchar', length: 5 })
  language!: string;
}