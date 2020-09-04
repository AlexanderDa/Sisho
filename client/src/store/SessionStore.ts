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
import { createProfile } from '@/models'
import { Profile } from '@/models'

@Module
export default class SessionStore extends VuexModule {
  public profile: Profile = createProfile()

  @Mutation
  setProfile(profile: Profile) {
    this.profile = profile
  }

  @Action({ commit: 'setProfile' })
  async loadProfile(): Promise<Profile> {
    let profile: Profile = createProfile()
    if (this.profile.id === 0) {
      const me = await accountService.me()
      profile = await profileService.findById(me.profileId)
    }
    return profile
  }
}
