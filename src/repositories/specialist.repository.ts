// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { Specialist, SpecialistRelations } from '../models'
import { SishoPgcDataSource } from '../datasources'
import { inject } from '@loopback/core'

export class SpecialistRepository extends DefaultCrudRepository<
  Specialist,
  typeof Specialist.prototype.id,
  SpecialistRelations
> {
  constructor(@inject('datasources.sishoPGC') dataSource: SishoPgcDataSource) {
    super(Specialist, dataSource)
  }
}
