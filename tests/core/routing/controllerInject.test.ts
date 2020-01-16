import { Bauble, Controller, Route, HttpMethod } from '../../../packages/routing/src/index'
import * as express from 'express'
import * as request from 'supertest'
import { Server } from 'http'
import { Injectable } from '../../../packages/routing/src/inject'

@Injectable()
class TInjectable {
    public member = {}
}

@Controller('api/test')
class TController {
    constructor(public injected: TInjectable) {}

    @Route(HttpMethod.Get)
    index(req: express.Request, res: express.Response) {
        res.json(!!this.injected.member)
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

describe('controller should inject injectables', () => {
    it('should have injectable', async () => {
        await request(server)
            .get('/api/test/index')
            .expect(200, 'true')
    })
})