// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Base } from '@/models'

export interface Profile extends Base {
  dni?: string
  passport?: string
  lastName: string
  firstName: string
  telephone?: string
  mobile?: string
  email?: string
  image?: string
  address: string
  blooType?: string
}

export function createProfile(): Profile {
  return {
    id: 0,
    firstName: '',
    lastName: '',
    address: ''
  }
}
