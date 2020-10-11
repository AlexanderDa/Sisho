// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Base } from '@/models'

export interface Rpe extends Base {
  head?: boolean
  neck?: boolean
  chest?: boolean
  abdomen?: boolean
  pelvis?: boolean
  extremities?: boolean
  observations?: string
}

export function createRpe(): Rpe {
  return {
    id: 0
  }
}
