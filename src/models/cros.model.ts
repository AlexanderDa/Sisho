// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { model } from '@loopback/repository'
import { boolean } from './pg'
import { integer } from './pg'
import { text } from './pg'
import { id } from './pg'
import { Audit } from '.'

/**
 * CURRENT REVIEW OF ORGANS AND SYSTEMS
 */
@model({
  settings: {
    foreignKeys: {
      fkCrosMedRec: {
        name: 'fk_cros_medrec',
        entity: 'MedicalRecord',
        entityKey: 'id',
        foreignKey: 'medicalrecordid'
      }
    }
  }
})
export class Cros extends Audit {
  @id() id?: number

  @boolean({ required: true, default: false }) senseOrgans: boolean

  @boolean({ required: true, default: false }) respiratory: boolean

  @boolean({ required: true, default: false }) cardiovascular: boolean

  @boolean({ required: true, default: false }) digestive: boolean

  @boolean({ required: true, default: false }) genital: boolean

  @boolean({ required: true, default: false }) urinary: boolean

  @boolean({ required: true, default: false }) skeletalMuscle: boolean

  @boolean({ required: true, default: false }) endocrine: boolean

  @boolean({ required: true, default: false }) lymphaticHeme: boolean

  @boolean({ required: true, default: false }) nervous: boolean

  @text() observations: string

  @integer({ required: true }) medicalRecordId?: number

  constructor(data?: Partial<Cros>) {
    super(data)
  }
}

export interface CrosRelations {
  // describe navigational properties here
}

export type CrosWithRelations = Cros & CrosRelations
