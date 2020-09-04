// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

export * from '@/models/HospitalModel'
export * from '@/models/ProfileModel'
export * from '@/models/ModuleModel'
export * from '@/models/OptionModel'
export * from '@/models/GroupModel'
export * from '@/models/RoleModel'
export * from '@/models/UserModel'

export interface Base {
  createdAt?: string
  createdBy?: number
  deleted?: boolean
  editedAt?: string
  editedBy?: number
  deletedAt?: string
  deletedBy?: number
  id: number
}
