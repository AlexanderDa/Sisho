// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { SishoPgcDataSource } from '../datasources'
import { Rpe, RpeRelations } from '../models'
import { inject } from '@loopback/core'

export class RpeRepository extends DefaultCrudRepository<
  Rpe,
  typeof Rpe.prototype.id,
  RpeRelations
> {
  constructor(@inject('datasources.sishoPGC') dataSource: SishoPgcDataSource) {
    super(Rpe, dataSource)
  }
}
