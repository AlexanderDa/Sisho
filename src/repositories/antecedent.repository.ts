// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { SishoPgcDataSource } from '../datasources'
import { AntecedentRelations } from '../models'
import { inject } from '@loopback/core'
import { Antecedent } from '../models'

export class AntecedentRepository extends DefaultCrudRepository<
  Antecedent,
  typeof Antecedent.prototype.id,
  AntecedentRelations
> {
  constructor(@inject('datasources.sishoPGC') dataSource: SishoPgcDataSource) {
    super(Antecedent, dataSource)
  }
}
