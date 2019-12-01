import { Bauble, Controller, Route, HttpMethod } from '../../../packages/core/src/index'
import * as express from 'express'
import * as request from 'supertest'
import { Server } from 'http'

@Controller('api/test')
class TController {
    @Route(HttpMethod.GET)
    index(req: express.Request, res: express.Response) {
        res.json(!!this.index)
    }
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

describe('controller should have this', () => {
    it('this should be truthy', async () => {
        await request(server)
            .get('/api/test/index')
            .expect(200, 'true')
    })
})