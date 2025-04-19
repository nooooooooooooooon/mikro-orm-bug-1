import { AnyEntity, Collection, PlainObject } from '@mikro-orm/mariadb'

export interface ITranslatable<T extends AnyEntity = any> extends AnyEntity {
    translations: Collection<T>;
}


// decorators/translation.decorator.ts
// import { Entity, EntityOptions, EntityRepositoryType } from '@mikro-orm/core'
  
// export function TranslationEntity<T extends ITranslatable>(options?: EntityOptions<T>) {
//     return (target: T) => {
//         Entity({ abstract: true, ...options })(target)
//     }
// }