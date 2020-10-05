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
import { MedicalRecord, Cros } from '../models'
import { MedicalRecordRepository } from '../repositories'

export class MedicalRecordCrosController {
  constructor(
    @repository(MedicalRecordRepository)
    protected medicalRecordRepository: MedicalRecordRepository
  ) {}

  @get('/medical-records/{id}/cros', {
    responses: {
      '200': {
        description: 'MedicalRecord has one Cros',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cros)
          }
        }
      }
    }
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cros>
  ): Promise<Cros> {
    return this.medicalRecordRepository.cros(id).get(filter)
  }

  @post('/medical-records/{id}/cros', {
    responses: {
      '200': {
        description: 'MedicalRecord model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cros) } }
      }
    }
  })
  async create(
    @param.path.number('id') id: typeof MedicalRecord.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cros, {
            title: 'NewCrosInMedicalRecord',
            exclude: ['id'],
            optional: ['medicalRecordId']
          })
        }
      }
    })
    cros: Omit<Cros, 'id'>
  ): Promise<Cros> {
    return this.medicalRecordRepository.cros(id).create(cros)
  }

  @patch('/medical-records/{id}/cros', {
    responses: {
      '200': {
        description: 'MedicalRecord.Cros PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cros, { partial: true })
        }
      }
    })
    cros: Partial<Cros>,
    @param.query.object('where', getWhereSchemaFor(Cros)) where?: Where<Cros>
  ): Promise<Count> {
    return this.medicalRecordRepository.cros(id).patch(cros, where)
  }

  @del('/medical-records/{id}/cros', {
    responses: {
      '200': {
        description: 'MedicalRecord.Cros DELETE success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cros)) where?: Where<Cros>
  ): Promise<Count> {
    return this.medicalRecordRepository.cros(id).delete(where)
  }
}
