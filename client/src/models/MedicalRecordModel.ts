// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Base } from '@/models'

export interface MedicalRecord extends Base {
  patientId?: number
}

export function createMedicalRecord(): MedicalRecord {
  return {
    id: 0
  }
}
