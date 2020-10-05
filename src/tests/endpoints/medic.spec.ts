// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Client, expect } from '@loopback/testlab'
import { Application } from '../..'
import { setupApplicationWithToken } from '../setup.spec'
import { MedicRepository } from '../../repositories'
import { message } from '../../utils'
import { Medic } from '../../models'
import { User } from '../../models'
import { random } from '../../utils'

let app: Application
let client: Client
let token: string
let session: User
let testModel: Medic

const clearUpdated = async () => {
  const repo = await app.getRepository(MedicRepository)
  await repo.updateById(testModel.id, { editedAt: undefined, editedBy: undefined })
}

const wasEdited = async (): Promise<boolean> => {
  const repo = await app.getRepository(MedicRepository)
  const result = await repo.findById(testModel.id)
  return result.editedAt !== null && result.editedBy === session.id
}

before('setupApplication', async () => {
  ;({ app, client, token, session } = await setupApplicationWithToken())
})

after(async () => {
  await app.stop()
})

describe(message.withAccess('Medic'), () => {
  it('POST    =>  /api/medic', async () => {
    await client
      .post('/api/medic')
      .send({
        lastName: 'ln_test',
        firstName: 'fn_test',
        address: 'address_test',
        regProfessional: random.string(10)
      })
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('createdAt').to.be.not.null()
        expect(res.body).to.have.property('createdBy').to.be.equal(session.id)
        // element created
        testModel = res.body
      })
  })

  it('GET     =>  /api/medics/count', async () => {
    await client
      .get('/api/medics/count')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('count').to.be.Number()
      })
  })

  it('GET     =>  /api/medics', async () => {
    await client
      .get('/api/medics')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an.Array()
      })
  })

  it('PATCH   =>  /api/medics', async () => {
    await client
      .patch('/api/medics')
      .auth(token, { type: 'bearer' })
      .query({ where: { id: testModel.id } })
      .send({ firstName: `fn_patch_${Date.now()}` })
      .expect(200)
      .then(async res => {
        expect(res.body).to.have.property('count').to.be.Number()
        expect(await wasEdited()).to.be.eql(true)
        await clearUpdated()
      })
  })

  it('GET     =>  /api/medic/{id}', async () => {
    await client
      .get(`/api/medic/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('createdAt').to.be.not.null()
      })
  })

  it('PATCH   =>  /api/medic/{id}', async () => {
    await client
      .patch(`/api/medic/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .send({ lastName: `ln_patch_${Date.now()}` })
      .expect(204)
      .then(async () => {
        expect(await wasEdited()).to.be.eql(true)
        await clearUpdated()
      })
  })

  it('DELETE  =>  /api/medic/{id}', async () => {
    await client
      .delete(`/api/medic/${testModel.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)
  })
})

describe(message.noAccess('Medic'), () => {
  it('POST    =>  /api/medic', async () => {
    await client.post('/api/medic').expect(401)
  })

  it('GET     =>  /api/medics/count', async () => {
    await client.get('/api/medics').expect(401)
  })

  it('GET     =>  /api/medics', async () => {
    await client.get('/api/medics').expect(401)
  })

  it('PATCH   =>  /api/medics', async () => {
    await client.patch('/api/medics').expect(401)
  })

  it('GET     =>  /api/medic/{id}', async () => {
    await client.get('/api/medic/1').expect(401)
  })

  it('PATCH   =>  /api/medic/{id}', async () => {
    await client.patch('/api/medic/1').expect(401)
  })

  it('DELETE  =>  /api/medic/{id}', async () => {
    await client.delete('/api/medic/1').expect(401)
  })
})
