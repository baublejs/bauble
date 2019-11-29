import { Bauble, Controller } from '../../../packages/core/src/index'
import * as express from 'express'
import * as request from 'supertest'
import { Server } from 'http'

@Controller()
class TController {
}

let app = express()
let server: Server

afterAll(async () => {
    server.close()
})

beforeAll(async () => {
    server = app.listen(0, () => {
        Bauble.start(app)
    })
})

describe('controller no route', () => {
    it('get', async () => {
        await request(server)
            .get('')
            .expect(404)
    })
})