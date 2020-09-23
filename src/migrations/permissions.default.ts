// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Permission } from '../models'
import { ANTECEDENT } from '.'
import { DIAGNOSTIC } from '.'
import { MEDICALEXAM } from '.'
import { MEDICALRECORD } from '.'
import { PATIENT } from '.'
import { VITALSIGN } from '.'
import { DISEASETYPE } from '.'
import { PERMISSION } from '.'
import { EXAMTYPE } from '.'
import { DISEASE } from '.'
import { PROFILE } from '.'
import { COMPANY } from '.'
import { MODULE } from '.'
import { OPTION } from '.'
import { EXAM } from '.'
import { ROLE } from '.'
import { USER } from '.'

/**
 * Default permissions.
 */
const ADMIN_PERMISSIONS: Permission[] = [
  crud(PERMISSION.id),
  crud(PROFILE.id),
  crud(COMPANY.id, { c: false }),
  crud(MODULE.id, { c: false, u: false, d: false }),
  crud(OPTION.id),
  crud(ROLE.id),
  crud(USER.id),
  crud(DISEASETYPE.id),
  crud(DISEASE.id),
  crud(EXAMTYPE.id),
  crud(EXAM.id),
  crud(PATIENT.id),
  crud(ANTECEDENT.id, { c: false }),
  crud(DIAGNOSTIC.id, { c: false }),
  crud(MEDICALEXAM.id, { c: false }),
  crud(MEDICALRECORD.id, { c: false }),
  crud(VITALSIGN.id, { c: false })
]

function crud(
  moduleId?: number,
  config?: { c?: boolean; r?: boolean; u?: boolean; d?: boolean }
): Permission {
  return new Permission({
    createdBy: 0,
    moduleId,
    create: config?.c ?? true,
    read: config?.r ?? true,
    update: config?.u ?? true,
    delete: config?.d ?? true
  })
}

export const DEFAULT_PERMISSIONS: { ADMIN: Permission[] } = {
  ADMIN: ADMIN_PERMISSIONS
}
