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
import { createMedic, createUser, Medic, User } from '@/models'
import { createProfile, Profile } from '@/models'

@Module
export default class SessionStore extends VuexModule {
  public user: User | null = null
  public profile: Profile | null = null
  public isMedic: boolean = false
  public medic: Medic | null = null

  @Mutation
  setProfile(data: {
    user: User | null
    profile: Profile | null
    isMedic: boolean
    medic: Medic | null
  }) {
    this.user = data.user
    this.profile = data.profile
    this.isMedic = data.isMedic
    this.medic = data.medic
  }

  @Action({ commit: 'setProfile' })
  async loadProfile(): Promise<{
    user: User
    profile: Profile
    isMedic: boolean
    medic?: Medic
  }> {
    return await accountService.me()
  }
}
