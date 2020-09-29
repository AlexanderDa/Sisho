// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Base } from '@/models'

export interface MedicalExam extends Base {
  examId?: number
  medicalRecordId?: number
}

export function createMedicalExam(): MedicalExam {
  return {
    id: 0
  }
}
