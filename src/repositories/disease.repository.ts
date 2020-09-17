// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor
} from '@loopback/repository'
import { Disease, DiseaseRelations, DiseaseType } from '../models'
import { SishoPgcDataSource } from '../datasources'
import { inject, Getter } from '@loopback/core'
import { DiseaseTypeRepository } from './disease-type.repository'

export class DiseaseRepository extends DefaultCrudRepository<
  Disease,
  typeof Disease.prototype.id,
  DiseaseRelations
> {
  public readonly diseaseType: BelongsToAccessor<DiseaseType, typeof Disease.prototype.id>

  constructor(
    @inject('datasources.sishoPGC') dataSource: SishoPgcDataSource,
    @repository.getter('DiseaseTypeRepository')
    protected diseaseTypeRepositoryGetter: Getter<DiseaseTypeRepository>
  ) {
    super(Disease, dataSource)
    this.diseaseType = this.createBelongsToAccessorFor(
      'diseaseType',
      diseaseTypeRepositoryGetter
    )
    this.registerInclusionResolver('diseaseType', this.diseaseType.inclusionResolver)
  }
}
