import { EntityManager, FindOneOptions, FilterQuery, Loaded } from '@mikro-orm/core'
import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '~/server/repositories/user.repository'
import { User } from '~/server/entities/user.entity'
// import { BaseTranslationService } from '~/server/services/base.translation.service'
// import { CreateUserDto } from '~/server/dto/nested-translation.dto'

@Injectable()
export class UserService { // extends BaseTranslationService<User, CreateUserDto, Partial<CreateUserDto>> {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository
  ) {
    // super(userRepository, entityManager);
  }

  async findOne(
    id: FilterQuery<User>,
    options?: FindOneOptions<User>
  ): Promise<Loaded<User> | null> {
    return await this.userRepository.findOne(id, options)
  }
}