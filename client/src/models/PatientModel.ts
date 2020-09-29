// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Base } from '@/models'

export interface Patient extends Base {
  dni?: string
  passport?: string
  lastName: string
  firstName: string
  ocupation: string
  birthday: string
  image?: string
  telephone?: string
  mobile?: string
  email?: string
  address: string
  blooType?: number
  civilStatus: number
  sex: number
}

export function createPatient(): Patient {
  return {
    id: 0,
    firstName: '',
    lastName: '',
    address: '',
    ocupation: '',
    birthday: '',
    civilStatus: 0,
    sex: 0
  }
}
