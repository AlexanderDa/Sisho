// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { hasOne, hasMany } from '@loopback/repository'
import { MedicalExam } from './medical-exam.model'
import { Diagnostic } from './diagnostic.model'
import { VitalSign } from './vital-sign.model'
import { model } from '@loopback/repository'
import { Disease } from './disease.model'
import { Exam } from './exam.model'
import { character } from './pg'
import { integer } from './pg'
import { boolean } from './pg'
import { text } from './pg'
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

  @character({ length: 150, required: true }) reason: string

  @text() currentIllness?: string

  @boolean({ default: false }) done: boolean

  @boolean({ default: false }) canceled: boolean

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
