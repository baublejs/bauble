import { Bauble, Controller } from '../../../packages/routing/src/index'
import * as express from 'express'
import * as request from 'supertest'
import { Server } from 'http'
import { Get, Put, Patch, Post, Delete } from '../../../packages/routing/src/routing/route/route.decorator'

@Controller()
class TController {
    @Get('')
    get(req: express.Request, res: express.Response) {
        res.send('T1')
    }

    @Put('')
    put(req: express.Request, res: express.Response) {
        res.send('T2')
    }

    @Patch('')
    patch(req: express.Request, res: express.Response) {
        res.send('T3')
    }

    @Post('')
    post(req: express.Request, res: express.Response) {
        res.send('T4')
    }

    @Delete('')
    delete(req: express.Request, res: express.Response) {
        res.send('T5')
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

describe('test verb decorators', () => {
    it('get', async () => {
        await request(server)
            .get('')
            .expect(200, 'T1')
    })
    
    it('put', async () => {
        await request(server)
            .put('')
            .expect(200, 'T2')
    })
    
    it('patch', async () => {
        await request(server)
            .patch('')
            .expect(200, 'T3')
    })
    
    it('post', async () => {
        await request(server)
            .post('')
            .expect(200, 'T4')
    })
    
    it('delete', async () => {
        await request(server)
            .delete('')
            .expect(200, 'T5')
    })
})