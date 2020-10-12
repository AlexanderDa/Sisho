// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Profile } from '../models'
import { User } from '../models'

/**
 * Administrator user profile.
 */
export const DEFAULT_PROFILE: Profile = new Profile({
  createdAt: new Date().toLocaleString(),
  createdBy: 0,
  firstName: 'admin',
  lastName: 'sisho',
  email: 'admin@sisho.com',
  address: 'my address'
})

/**
 * Default Administrator user.
 */
export const DEFAULT_ADMIN: User = new User({
  createdAt: new Date().toLocaleString(),
  createdBy: 0,
  email: DEFAULT_PROFILE.email,
  password: 'adminP4$$',
  isActive: true,
  emailVerified: true
})
