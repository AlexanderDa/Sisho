// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Client, expect } from '@loopback/testlab'
import { setupApplicationWithToken } from '../setup.spec'
import { VitalSignRepository } from '../../repositories'
import { VitalSign, Patient } from '../../models'
import { MedicalRecord } from '../../models'
import { message } from '../../utils'
import { User } from '../../models'
import { Application } from '../..'

let app: Application
let client: Client
let token: string
let session: User
let testModel: VitalSign
let patientModel: Patient
let medRecModel: MedicalRecord

const clearUpdated = async () => {
  const repo = await app.getRepository(VitalSignRepository)
  await repo.updateById(testModel.id, { editedAt: undefined, editedBy: undefined })
}

const wasEdited = async (): Promise<boolean> => {
  const repo = await app.getRepository(VitalSignRepository)
  const result = await repo.findById(testModel.id)
  return result.editedAt !== null && result.editedBy === session.id
}

before('setupApplication', async () => {
  ;({ app, client, token, session } = await setupApplicationWithToken())
})

after(async () => {
  await app.stop()
})

describe(message.withAccess('VitalSign'), () => {
  it('POST    =>  /api/vitalsign', async () => {
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
      .then(({ body }) => (medRecModel = new MedicalRecord(body)))

    await client
      .post(`/api/medicalrecord/${medRecModel.id}/vitalsign`)
      .send({
        temperature: '10',
        systolicPressure: '10',
        diastolicPressure: '10',
        pulse: '10',
        breathingFrequency: '10',
        oxygenSaturation: 10,
        tall: 10,
        weight: 10,
        mass: 10
      })
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => {
        expect(body).to.have.property('createdAt').to.be.not.null()
        expect(body).to.have.property('createdBy').to.be.eql(session.id)
        // element created
        testModel = new VitalSign(body)
      })
  })

  it('GET     =>  /api/medicalrecord/{id}/vitalsign', async () => {
    await client
      .get(`/api/medicalrecord/${medRecModel.id}/vitalsign`)
      .auth(token, { type: 'bearer' })
      .expect(200)
  })

  it('GET     =>  /api/vitalsigns/count', async () => {
    await client
      .get('/api/vitalsigns/count')
      .query({})
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('count').to.be.Number()
      })
  })

  it('GET     =>  /api/vitalsigns', async () => {
    await client
      .get('/api/vitalsigns')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an.Array()
      })
  })

  it('PATCH   =>  /api/vitalsigns', async () => {
    await client
      .patch('/api/vitalsigns')
      .auth(token, { type: 'bearer' })
      .query({ where: { id: testModel.id } })
      .send({ temperature: `37` })
      .expect(200)
      .then(async res => {
        expect(res.body).to.have.property('count').to.be.Number().to.be.eql(1)
        expect(await wasEdited()).to.be.eql(true)
        await clearUpdated()
      })
  })

  it('GET     =>  /api/vitalsign/{id}', async () => {
    await client
      .get(`/api/vitalsign/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('createdAt').to.be.not.null()
      })
  })

  it('PATCH   =>  /api/vitalsign/{id}', async () => {
    await client
      .patch(`/api/vitalsign/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .send({ tall: 170 })
      .expect(204)
      .then(async () => {
        expect(await wasEdited()).to.be.eql(true)
        await clearUpdated()
      })
  })

  it('DELETE  =>  /api/vitalsign/{id}', async () => {
    await client
      .delete(`/api/vitalsign/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)
      .then(async () => {
        await client
          .delete(`/api/medicalrecord/${medRecModel.id}`)
          .auth(token, { type: 'bearer' })
          .expect(204)
        await client
          .delete(`/api/patient/${patientModel.id}`)
          .auth(token, { type: 'bearer' })
          .expect(204)
      })
  })
})

describe(message.noAccess('VitalSign'), () => {
  it('POST    =>  /api/medicalrecord/{id}/vitalsign', async () => {
    await client.post('/api/medicalrecord/1/vitalsign').expect(401)
  })

  it('GET     =>  /api/medicalrecord/{id}/vitalsign', async () => {
    await client.get('/api/medicalrecord/1/vitalsign').expect(401)
  })

  it('GET     =>  /api/vitalsigns/count', async () => {
    await client.get('/api/vitalsigns/count').expect(401)
  })

  it('GET     =>  /api/vitalsigns', async () => {
    await client.get('/api/vitalsigns').expect(401)
  })

  it('PATCH   =>  /api/vitalsigns', async () => {
    await client.patch('/api/vitalsigns').expect(401)
  })

  it('GET     =>  /api/vitalsign/{id}', async () => {
    await client.get('/api/vitalsign/1').expect(401)
  })

  it('PATCH   =>  /api/vitalsign/{id}', async () => {
    await client.patch('/api/vitalsign/1').expect(401)
  })

  it('DELETE  =>  /api/vitalsign/{id}', async () => {
    await client.delete('/api/vitalsign/1').expect(401)
  })
})
