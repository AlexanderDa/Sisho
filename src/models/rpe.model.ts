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
 * REGIONAL PHYSICAL EXAM
 */
@model({
  settings: {
    foreignKeys: {
      fkRPEMedRec: {
        name: 'fk_rpe_medrec',
        entity: 'MedicalRecord',
        entityKey: 'id',
        foreignKey: 'medicalrecordid'
      }
    }
  }
})
export class Rpe extends Audit {
  @id() id?: number

  @boolean({ required: true, default: false }) head: boolean

  @boolean({ required: true, default: false }) neck: boolean

  @boolean({ required: true, default: false }) chest: boolean

  @boolean({ required: true, default: false }) abdomen: boolean

  @boolean({ required: true, default: false }) pelvis: boolean

  @boolean({ required: true, default: false }) extremities: boolean

  @text() observations?: string

  @integer({ required: true }) medicalRecordId?: number

  constructor(data?: Partial<Rpe>) {
    super(data)
  }
}

export interface RpeRelations {
  // describe navigational properties here
}

export type RpeWithRelations = Rpe & RpeRelations
