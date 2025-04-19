import { BaseEntity as MikroORMBaseEntity, BigIntType, PrimaryKey, wrap } from '@mikro-orm/mariadb';

export abstract class BaseEntity extends MikroORMBaseEntity {
  @PrimaryKey({ type: BigIntType })
  id!: string;
}