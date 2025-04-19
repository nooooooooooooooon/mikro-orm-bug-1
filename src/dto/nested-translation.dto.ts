/**
 * @file
 */

import { Type } from 'class-transformer';
import { IsObject, ValidateNested, IsOptional, IsString } from 'class-validator';
import { Collection, PlainObject } from '@mikro-orm/mariadb'

export class PhoneTranslationDto extends PlainObject {
  @IsString()
  description!: string;
}

export class CreatePhoneDto extends PlainObject {
  @IsString()
  number!: string;

  @IsObject()
  @ValidateNested()
  translations!: Record<string, PhoneTranslationDto>;
}

export class ProfileTranslationDto extends PlainObject {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;
}

export class CreateProfileDto extends PlainObject {
  @IsObject()
  @ValidateNested()
  translations!: Record<string, ProfileTranslationDto>;

  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CreatePhoneDto)
  phones!: CreatePhoneDto[];
}

export class CreateUserDto extends PlainObject {
  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile!: CreateProfileDto;

  @IsObject()
  @ValidateNested()
  translations!: Collection<PhoneTranslationDto>;
}

export class WorkerTranslationDto extends PlainObject {
  @IsString()
  description!: string;
}

export class CreateWorkerDto extends PlainObject {
  @IsString()
  number!: string;

  @IsObject()
  @ValidateNested()
  translations!: Record<string, WorkerTranslationDto>;
}