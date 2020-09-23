// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { VitalSign, VitalSignRelations } from '../models'
import { SishoPgcDataSource } from '../datasources'
import { inject } from '@loopback/core'

export class VitalSignRepository extends DefaultCrudRepository<
  VitalSign,
  typeof VitalSign.prototype.id,
  VitalSignRelations
> {
  constructor(@inject('datasources.sishoPGC') dataSource: SishoPgcDataSource) {
    super(VitalSign, dataSource)
  }
}
