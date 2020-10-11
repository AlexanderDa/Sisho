// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Base } from '@/models'

export interface Cros extends Base {
  senseOrgans?: boolean
  respiratory?: boolean
  cardiovascular?: boolean
  digestive?: boolean
  genital?: boolean
  urinary?: boolean
  skeletalMuscle?: boolean
  endocrine?: boolean
  lymphaticHeme?: boolean
  nervous?: boolean
  observations?: string
}

export function createCros(): Cros {
  return {
    id: 0
  }
}
