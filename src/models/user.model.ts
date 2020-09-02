// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { belongsTo } from '@loopback/repository'
import { model } from '@loopback/repository'
import { Role } from './role.model'
import { Audit } from '.'
import { id } from './pg'
import { email } from './pg'
import { boolean } from './pg'
import { integer } from './pg'
import { character } from './pg'

@model({
  name: 'tuser',
  settings: {
    hiddenProperties: ['password', 'verificationToken', 'passResetToken'],
    foreignKeys: {
      fkUserRole: {
        name: 'fk_user_role',
        entity: 'Role',
        entityKey: 'id',
        foreignKey: 'roleid'
      },
      fkUserProfile: {
        name: 'fk_user_profile',
        entity: 'Profile',
        entityKey: 'id',
        foreignKey: 'profileid'
      }
    },
    indexes: {
      uniqueUserEmail: {
        keys: { email: 1 },
        options: { unique: true }
      },
      uniquePassResetTokenCode: {
        keys: { passResetToken: 1 },
        options: { unique: true }
      },
      uniqueVerificationToken: {
        keys: { verificationToken: 1 },
        options: { unique: true }
      }
    }
  }
})
export class User extends Audit {
  @id() id?: number

  @email({ required: true }) email: string

  @character({ length: 75 }) password?: string

  @boolean({ required: true, default: true }) isActive?: boolean

  @boolean({ default: false, required: false }) emailVerified?: boolean

  @character({ length: 200 }) verificationToken: string

  @character({ length: 200 }) passResetToken?: string

  @belongsTo(() => Role, {}, { required: true }) roleId: number

  @integer({ required: true }) profileId: number

  constructor(data?: Partial<User>) {
    super(data)
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations
