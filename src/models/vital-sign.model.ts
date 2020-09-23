// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { model } from '@loopback/repository'
import { character } from './pg'
import { integer } from './pg'
import { id } from './pg'
import { Audit } from '.'

@model({
  settings: {
    foreignKeys: {
      fkSignMedRec: {
        name: 'fk_sign_medrec',
        entity: 'MedicalRecord',
        entityKey: 'id',
        foreignKey: 'medicalrecordid'
      }
    }
  }
})
export class VitalSign extends Audit {
  @id() id?: number

  @character({ length: 5, required: true }) temperature: string

  @character({ length: 5, required: true }) systolicPressure: string

  @character({ length: 5, required: true }) diastolicPressure: string

  @character({ length: 5, required: true }) pulse: string

  @character({ length: 5, required: true }) breathingFrequency: string

  @integer({ required: true }) oxygenSaturation: number

  @integer({ required: true }) tall: number

  @integer({ required: true }) weight: number

  @integer({ required: true }) mass: number

  @integer({ required: true }) medicalRecordId?: number

  constructor(data?: Partial<VitalSign>) {
    super(data)
  }
}

export interface VitalSignRelations {
  // describe navigational properties here
}

export type VitalSignWithRelations = VitalSign & VitalSignRelations
