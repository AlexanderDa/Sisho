// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { inject } from '@loopback/core'
import { repository } from '@loopback/repository'
import { RestBindings } from '@loopback/rest'
import { Request } from '@loopback/rest'
import { get } from '@loopback/rest'
import { app } from '../utils'
import spect from './specs/app.specs'
import { CompanyRepository } from '../repositories'

export class AppController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository(CompanyRepository) public companyRepo: CompanyRepository
  ) {}

  @get('/api/app', spect)
  async ping(): Promise<object> {
    const company = await this.companyRepo.findById(1)

    return {
      name: app.name,
      version: app.version,
      company: {
        name: company.name,
        logo: company.logo ?? '/logo.svg',
        primaryColor: company.primaryColor,
        secondaryColor: company.secondaryColor
      }
    }
  }
}
