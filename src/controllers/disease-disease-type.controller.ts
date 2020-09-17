// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { repository } from '@loopback/repository'
import { param, get, getModelSchemaRef } from '@loopback/rest'
import { Disease, DiseaseType } from '../models'
import { DiseaseRepository } from '../repositories'

export class DiseaseDiseaseTypeController {
  constructor(
    @repository(DiseaseRepository)
    public diseaseRepository: DiseaseRepository
  ) {}

  @get('/diseases/{id}/disease-type', {
    responses: {
      '200': {
        description: 'DiseaseType belonging to Disease',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(DiseaseType) }
          }
        }
      }
    }
  })
  async getDiseaseType(
    @param.path.number('id') id: typeof Disease.prototype.id
  ): Promise<DiseaseType> {
    return this.diseaseRepository.diseaseType(id)
  }
}
