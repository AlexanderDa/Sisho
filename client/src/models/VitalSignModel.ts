// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Base } from '@/models'

export interface VitalSign extends Base {
  temperature: string
  systolicPressure: string
  diastolicPressure: string
  pulse: string
  breathingFrequency: string
  oxygenSaturation: number
  tall: number
  weight: number
  mass: number
  medicalRecordId?: number
}

export function createVitalSign(): VitalSign {
  return {
    id: 0,
    temperature: '',
    systolicPressure: '',
    diastolicPressure: '',
    pulse: '',
    breathingFrequency: '',
    oxygenSaturation: 0,
    tall: 0,
    weight: 0,
    mass: 0
  }
}
