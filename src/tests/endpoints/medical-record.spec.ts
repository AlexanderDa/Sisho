// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Client, expect } from '@loopback/testlab'
import { setupApplicationWithToken } from '../setup.spec'
import { MedicalRecordRepository } from '../../repositories'
import { MedicalRecord } from '../../models'
import { Patient } from '../../models'
import { message } from '../../utils'
import { User } from '../../models'
import { Application } from '../..'

let app: Application
let client: Client
let token: string
let session: User
let testModel: MedicalRecord
let patientModel: Patient

const clearUpdated = async () => {
  const repo = await app.getRepository(MedicalRecordRepository)
  await repo.updateById(testModel.id, { editedAt: undefined, editedBy: undefined })
}

const wasEdited = async (): Promise<boolean> => {
  const repo = await app.getRepository(MedicalRecordRepository)
  const result = await repo.findById(testModel.id)
  return result.editedAt !== null && result.editedBy === session.id
}

before('setupApplication', async () => {
  ;({ app, client, token, session } = await setupApplicationWithToken())
})

after(async () => {
  await app.stop()
})

describe(message.withAccess('MedicalRecord'), () => {
  it('POST    =>  /api/medicalrecord', async () => {
    await client
      .post('/api/patient')
      .send({
        lastName: 'ln_test',
        firstName: 'fn_test',
        ocupation: 'ocupation',
        birthday: new Date(),
        address: 'address_test',
        sex: 0
      })
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => (patientModel = new Patient(body)))

    await client
      .post(`/api/patient/${patientModel.id}/medicalrecord`)
      .send({ reason: 'reason_test', currentIllness: 'illness' })
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => {
        expect(body).to.have.property('createdAt').to.be.not.null()
        expect(body).to.have.property('createdBy').to.be.eql(session.id)
        // element created
        testModel = new MedicalRecord(body)
      })
  })

  it('GET     =>  /api/patient/{id}/medicalrecords', async () => {
    await client
      .get(`/api/patient/${patientModel.id}/medicalrecords`)
      .auth(token, { type: 'bearer' })
      .expect(200)
  })

  it('GET     =>  /api/medicalrecords/count', async () => {
    await client
      .get('/api/medicalrecords/count')
      .query({})
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('count').to.be.Number()
      })
  })

  it('GET     =>  /api/medicalrecords', async () => {
    await client
      .get('/api/medicalrecords')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an.Array()
      })
  })

  it('PATCH   =>  /api/medicalrecords', async () => {
    await client
      .patch('/api/medicalrecords')
      .auth(token, { type: 'bearer' })
      .query({ where: { id: testModel.id } })
      .send({ currentIllness: `patch.${testModel.currentIllness}.edited` })
      .expect(200)
      .then(async res => {
        expect(res.body).to.have.property('count').to.be.Number().to.be.eql(1)
        expect(await wasEdited()).to.be.eql(true)
        await clearUpdated()
      })
  })

  it('GET     =>  /api/medicalrecord/{id}', async () => {
    await client
      .get(`/api/medicalrecord/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('createdAt').to.be.not.null()
      })
  })

  it('PATCH   =>  /api/medicalrecord/{id}', async () => {
    await client
      .patch(`/api/medicalrecord/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .send({ currentIllness: `patch.${testModel.currentIllness}` })
      .expect(204)
      .then(async () => {
        expect(await wasEdited()).to.be.eql(true)
        await clearUpdated()
      })
      .catch(err => console.log(err))
  })

  it('DELETE  =>  /api/medicalrecord/{id}', async () => {
    await client
      .delete(`/api/medicalrecord/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)
      .then(async () => {
        await client
          .delete(`/api/patient/${patientModel.id}`)
          .auth(token, { type: 'bearer' })
          .expect(204)
      })
  })
})

describe(message.noAccess('MedicalRecord'), () => {
  it('POST    =>  /api/patient/{id}/medicalrecord', async () => {
    await client.post('/api/patient/1/medicalrecord').expect(401)
  })

  it('GET     =>  /api/patient/{id}/medicalrecords', async () => {
    await client.get('/api/patient/1/medicalrecords').expect(401)
  })

  it('GET     =>  /api/medicalrecords/count', async () => {
    await client.get('/api/medicalrecords/count').expect(401)
  })

  it('GET     =>  /api/medicalrecords', async () => {
    await client.get('/api/medicalrecords').expect(401)
  })

  it('PATCH   =>  /api/medicalrecords', async () => {
    await client.patch('/api/medicalrecords').expect(401)
  })

  it('GET     =>  /api/medicalrecord/{id}', async () => {
    await client.get('/api/medicalrecord/1').expect(401)
  })

  it('PATCH   =>  /api/medicalrecord/{id}', async () => {
    await client.patch('/api/medicalrecord/1').expect(401)
  })

  it('DELETE  =>  /api/medicalrecord/{id}', async () => {
    await client.delete('/api/medicalrecord/1').expect(401)
  })
})
