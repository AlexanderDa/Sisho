// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Permission } from '../models'
import { DISEASETYPE } from '.'
import { PERMISSION } from '.'
import { DISEASE } from '.'
import { PROFILE } from '.'
import { COMPANY } from '.'
import { MODULE } from '.'
import { OPTION } from '.'
import { ROLE } from '.'
import { USER } from '.'

/**
 * Default permissions.
 */
const ADMIN_PERMISSIONS: Permission[] = [
  new Permission({
    createdBy: 0,
    moduleId: PERMISSION.id,
    create: true,
    read: true,
    update: true,
    delete: true
  }),
  new Permission({
    createdBy: 0,
    moduleId: PROFILE.id,
    create: true,
    read: true,
    update: true,
    delete: true
  }),
  new Permission({
    createdBy: 0,
    moduleId: COMPANY.id,
    create: false,
    read: true,
    update: true,
    delete: false
  }),
  new Permission({
    createdBy: 0,
    moduleId: MODULE.id,
    create: false,
    read: true,
    update: false,
    delete: false
  }),
  new Permission({
    createdBy: 0,
    moduleId: OPTION.id,
    create: true,
    read: true,
    update: true,
    delete: true
  }),
  new Permission({
    createdBy: 0,
    moduleId: ROLE.id,
    create: true,
    read: true,
    update: true,
    delete: true
  }),
  new Permission({
    createdBy: 0,
    moduleId: USER.id,
    create: true,
    read: true,
    update: true,
    delete: true
  }),
  new Permission({
    createdBy: 0,
    moduleId: DISEASETYPE.id,
    create: true,
    read: true,
    update: true,
    delete: true
  }),
  new Permission({
    createdBy: 0,
    moduleId: DISEASE.id,
    create: true,
    read: true,
    update: true,
    delete: true
  })
]

export const DEFAULT_PERMISSIONS: { ADMIN: Permission[] } = {
  ADMIN: ADMIN_PERMISSIONS
}
