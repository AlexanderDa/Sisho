// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { MedicalSpecialtyRelations } from '../models'
import { SishoPgcDataSource } from '../datasources'
import { MedicalSpecialty } from '../models'
import { inject } from '@loopback/core'

export class MedicalSpecialtyRepository extends DefaultCrudRepository<
  MedicalSpecialty,
  typeof MedicalSpecialty.prototype.id,
  MedicalSpecialtyRelations
> {
  constructor(@inject('datasources.sishoPGC') dataSource: SishoPgcDataSource) {
    super(MedicalSpecialty, dataSource)
  }
}
