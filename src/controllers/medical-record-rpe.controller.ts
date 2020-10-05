// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Count, CountSchema, Filter, repository, Where } from '@loopback/repository'
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest'
import { MedicalRecord, Rpe } from '../models'
import { MedicalRecordRepository } from '../repositories'

export class MedicalRecordRpeController {
  constructor(
    @repository(MedicalRecordRepository)
    protected medicalRecordRepository: MedicalRecordRepository
  ) {}

  @get('/medical-records/{id}/rpe', {
    responses: {
      '200': {
        description: 'MedicalRecord has one Rpe',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Rpe)
          }
        }
      }
    }
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Rpe>
  ): Promise<Rpe> {
    return this.medicalRecordRepository.rpe(id).get(filter)
  }

  @post('/medical-records/{id}/rpe', {
    responses: {
      '200': {
        description: 'MedicalRecord model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Rpe) } }
      }
    }
  })
  async create(
    @param.path.number('id') id: typeof MedicalRecord.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rpe, {
            title: 'NewRpeInMedicalRecord',
            exclude: ['id'],
            optional: ['medicalRecordId']
          })
        }
      }
    })
    rpe: Omit<Rpe, 'id'>
  ): Promise<Rpe> {
    return this.medicalRecordRepository.rpe(id).create(rpe)
  }

  @patch('/medical-records/{id}/rpe', {
    responses: {
      '200': {
        description: 'MedicalRecord.Rpe PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rpe, { partial: true })
        }
      }
    })
    rpe: Partial<Rpe>,
    @param.query.object('where', getWhereSchemaFor(Rpe)) where?: Where<Rpe>
  ): Promise<Count> {
    return this.medicalRecordRepository.rpe(id).patch(rpe, where)
  }

  @del('/medical-records/{id}/rpe', {
    responses: {
      '200': {
        description: 'MedicalRecord.Rpe DELETE success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Rpe)) where?: Where<Rpe>
  ): Promise<Count> {
    return this.medicalRecordRepository.rpe(id).delete(where)
  }
}
