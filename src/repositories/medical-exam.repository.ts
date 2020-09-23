// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { DefaultCrudRepository } from '@loopback/repository'
import { SishoPgcDataSource } from '../datasources'
import { MedicalExamRelations } from '../models'
import { MedicalExam } from '../models'
import { inject } from '@loopback/core'

export class MedicalExamRepository extends DefaultCrudRepository<
  MedicalExam,
  typeof MedicalExam.prototype.id,
  MedicalExamRelations
> {
  constructor(@inject('datasources.sishoPGC') dataSource: SishoPgcDataSource) {
    super(MedicalExam, dataSource)
  }
}
