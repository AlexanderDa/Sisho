// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory
} from '@loopback/repository'
import { DiseaseType, DiseaseTypeRelations, Disease } from '../models'
import { SishoPgcDataSource } from '../datasources'
import { inject, Getter } from '@loopback/core'
import { DiseaseRepository } from './disease.repository'

export class DiseaseTypeRepository extends DefaultCrudRepository<
  DiseaseType,
  typeof DiseaseType.prototype.id,
  DiseaseTypeRelations
> {
  public readonly diseases: HasManyRepositoryFactory<
    Disease,
    typeof DiseaseType.prototype.id
  >

  constructor(
    @inject('datasources.sishoPGC') dataSource: SishoPgcDataSource,
    @repository.getter('DiseaseRepository')
    protected diseaseRepositoryGetter: Getter<DiseaseRepository>
  ) {
    super(DiseaseType, dataSource)
    this.diseases = this.createHasManyRepositoryFactoryFor(
      'diseases',
      diseaseRepositoryGetter
    )
    this.registerInclusionResolver('diseases', this.diseases.inclusionResolver)
  }
}
