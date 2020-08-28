// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import path from 'path'
import { inject } from '@loopback/core'
import { authenticate } from '@loopback/authentication'
import { repository } from '@loopback/repository'
import { HttpErrors } from '@loopback/rest'
import { post, requestBody } from '@loopback/rest'
import { ProfileRepository } from '../repositories'
import { CompanyRepository } from '../repositories'
import { UserRepository } from '../repositories'
import * as spect from './specs/email.specs'
import { StorageService } from '../services'
import { EmailService } from '../services'
import { StorageBindings } from '../keys'
import { EmailBindings } from '../keys'
import { EMAIL } from '../configs'

@authenticate('jwt')
export class EmailController {
  constructor(
    @inject(EmailBindings.SERVICE) public emailService: EmailService,
    @inject(StorageBindings.SERVICE) public storageService: StorageService,
    @repository(UserRepository) public userRepo: UserRepository,
    @repository(CompanyRepository) public companyRepo: CompanyRepository,
    @repository(ProfileRepository) public profileRepo: ProfileRepository
  ) {}

  @post('/api/email/welcome', spect.response())
  async create(@requestBody(spect.email()) { email }: { email: string }): Promise<void> {
    if (!EMAIL.isSupported()) {
      throw new HttpErrors.Forbidden('EMAIL_NOT_SUPPORTED')
    }

    const user = await this.userRepo.findOne({ where: { email } })

    if (user) {
      const profile = await this.profileRepo.findById(user?.profileId)

      await this.emailService.welcome({
        logo: await this.companyLogo(),
        username: profile.firstName,
        image: profile.image,
        email: user.email,
        verificationToken: user.verificationToken
      })
    } else {
      throw new HttpErrors.BadRequest('BAD_ACCOUNT')
    }
  }

  private async companyLogo(): Promise<string> {
    const company = await this.companyRepo.findById(1)
    let logo: string = path.resolve('./public/public/logo.svg')
    if (company)
      if (company.logo)
        logo = this.storageService.getSandbox(company.logo?.split('/').pop() ?? '')

    return logo
  }
}
