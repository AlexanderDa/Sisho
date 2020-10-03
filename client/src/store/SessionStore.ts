// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import accountService from '@/services/AccountService'
import profileService from '@/services/ProfileService'
import { VuexModule } from 'vuex-module-decorators'
import { Mutation } from 'vuex-module-decorators'
import { Module } from 'vuex-module-decorators'
import { Action } from 'vuex-module-decorators'
import { createUser, User } from '@/models'
import { createProfile, Profile } from '@/models'

@Module
export default class SessionStore extends VuexModule {
  public user: User | null = null
  public profile: Profile | null = null

  @Mutation
  setProfile(data: { user: User | null; profile: Profile | null }) {
    this.user = data.user
    this.profile = data.profile
  }

  @Action({ commit: 'setProfile' })
  async loadProfile(): Promise<{ user: User; profile: Profile }> {
    let profile: Profile = createProfile()
    let user: User = createUser()
    if (!this.profile) {
      const me = await accountService.me()
      profile = await profileService.findById(me.profileId)

      user.id = me.id
      user.email = me.email
      user.isActive = me.isActive
      user.profileId = me.profileId
      user.roleId = me.roleId
    }
    return { user, profile }
  }
}
