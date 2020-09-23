// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { hasOne, hasMany } from '@loopback/repository'
import { model } from '@loopback/repository'
import { MedicalExam } from './medical-exam.model'
import { Diagnostic } from './diagnostic.model'
import { VitalSign } from './vital-sign.model'
import { Disease } from './disease.model'
import { Exam } from './exam.model'
import { integer } from './pg'
import { id } from './pg'
import { Audit } from '.'

@model({
  settings: {
    foreignKeys: {
      fkMedRecPatient: {
        name: 'fk_medrec_patient',
        entity: 'Patient',
        entityKey: 'id',
        foreignKey: 'patientid'
      }
    }
  }
})
export class MedicalRecord extends Audit {
  @id() id?: number

  @integer({ required: true }) patientId: number

  @hasOne(() => VitalSign) vitalSign: VitalSign

  @hasMany(() => Disease, { through: { model: () => Diagnostic } })
  diseases: Disease[]

  @hasMany(() => Exam, { through: { model: () => MedicalExam } })
  exams: Exam[]

  constructor(data?: Partial<MedicalRecord>) {
    super(data)
  }
}

export interface MedicalRecordRelations {
  // describe navigational properties here
}

export type MedicalRecordWithRelations = MedicalRecord & MedicalRecordRelations
