// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { MedicalRecordRepository } from '../../repositories'
import { setupApplicationWithToken } from '../setup.spec'
import { ExamTypeRepository } from '../../repositories'
import { PatientRepository } from '../../repositories'
import { Client, expect } from '@loopback/testlab'
import { MedicalRecord } from '../../models'
import { ExamType } from '../../models'
import { Patient } from '../../models'
import { message } from '../../utils'
import { Application } from '../..'
import { Exam } from '../../models'

let app: Application
let client: Client
let token: string
let disTypeModel: ExamType
let examModel: Exam
let patientModel: Patient
let medRecModel: MedicalRecord

before('setupApplication', async () => {
  ;({ app, client, token } = await setupApplicationWithToken())
})

after(async () => {
  const repo = await app.getRepository(MedicalRecordRepository)
  await repo.exams(medRecModel.id).delete()
  await repo.deleteById(medRecModel.id)

  const pRepo = await app.getRepository(PatientRepository)
  await pRepo.deleteById(patientModel.id)

  const etRepo = await app.getRepository(ExamTypeRepository)
  await etRepo.deleteById(disTypeModel.id)

  await app.stop()
})

describe(message.withAccess('Antecedent'), () => {
  it('POST    =>  /api/medicalrecord/{id}/medicalexams', async () => {
    // create an exam
    await client
      .post('/api/examtype')
      .send({
        name: `test.name${Date.now()}`
      })
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => (disTypeModel = new ExamType(body)))
    console.log(`type: ${disTypeModel.id}`)

    await client
      .post(`/api/examtype/${disTypeModel.id}/exam`)
      .auth(token, { type: 'bearer' })
      .send({ name: `test.exam${Date.now()}`, examTypeId: disTypeModel.id })
      .expect(200)
      .then(({ body }) => (examModel = new Exam(body)))
    console.log(`exam: ${examModel.id}`)

    // Create a patient and their medical record
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

    console.log(`patient: ${patientModel.id}`)

    await client
      .post(`/api/patient/${patientModel.id}/medicalrecord`)
      .send({ reason: 'reason_test', currentIllness: 'illness' })
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => (medRecModel = new MedicalRecord(body)))

    console.log(`record: ${medRecModel.id}`)

    // create the diagnostics
    await client
      .post(`/api/medicalrecord/${medRecModel.id}/medicalexams`)
      .send([{ examId: examModel.id }])
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(({ body }) => {
        expect(body).to.have.property('count').to.be.Number().to.be.eql(1)
      })
  })

  it('GET     =>  /api/medicalrecord/{id}/medicalexams', async () => {
    await client
      .get(`/api/medicalrecord/${patientModel.id}/medicalexams`)
      .auth(token, { type: 'bearer' })
      .expect(200)
  })
})

describe(message.noAccess('Antecedent'), () => {
  it('POST    =>  /api/medicalrecord/{id}/medicalexams', async () => {
    await client.post('/api/medicalrecord/1/medicalexams').expect(401)
  })

  it('GET     =>  /api/medicalrecord/{id}/medicalexams', async () => {
    await client.get('/api/medicalrecord/1/medicalexams').expect(401)
  })
})
