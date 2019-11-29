import { Bauble, Controller, Route, HttpMethod } from '../../../packages/core/src/index'
import * as express from 'express'
import * as request from 'supertest'
import { Server } from 'http'

@Controller('api/test')
class TController {
    @Route(HttpMethod.GET)
    index(req: express.Request, res: express.Response) {
        res.send('T1')
    }

    @Route(HttpMethod.GET, '/v2')
    index2(req: express.Request, res: express.Response) {
        res.send('T2')
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

describe('controller root route', () => {
    it('should have root', async () => {
        await request(server)
            .get('/api/test/index')
            .expect(200, 'T1')
    })

    it('should have root with route', async () => {
        await request(server)
            .get('/api/test/v2')
            .expect(200, 'T2')
    })
})