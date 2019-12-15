import { Bauble, Controller } from '../../../packages/core/src/index'
import * as express from 'express'
import * as request from 'supertest'
import { Server } from 'http'
import { Get } from '../../../packages/core/src/routing/route/route.decorator'
import { ok, created, noContent, notModified, badRequest, unauthorized, forbidden, notFound, conflict, internalServerError, Response } from '../../../packages/core/src/routing/response/response'

@Controller()
class TController {
    @Get()
    async ok() {
        return ok('ok')
    }

    @Get()
    async created() {
        return created('created')
    }

    @Get()
    async noContent() {
        return noContent()
    }

    @Get()
    async notModified() {
        return notModified()
    }

    @Get()
    async badRequest() {
        return badRequest('badRequest')
    }

    @Get()
    async unauthorized() {
        return unauthorized('unauthorized')
    }

    @Get()
    async forbidden() {
        return forbidden('forbidden')
    }

    @Get()
    async notFound() {
        return notFound('notFound')
    }

    @Get()
    async conflict() {
        return conflict('conflict')
    }

    @Get()
    async internalServerError() {
        return internalServerError('internalServerError')
    }

    @Get()
    async response() {
        return new Response(503, 'response')
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

describe('controller responses', () => {
    it('ok', async () => {
        await request(server)
            .get('/ok')
            .expect(200, '"ok"')
    })

    it('created', async () => {
        await request(server)
            .get('/created')
            .expect(201, '"created"')
    })

    it('noContent', async () => {
        await request(server)
            .get('/noContent')
            .expect(204, '')
    })

    it('notModified', async () => {
        await request(server)
            .get('/notModified')
            .expect(304, '')
    })

    it('badRequest', async () => {
        await request(server)
            .get('/badRequest')
            .expect(400, '"badRequest"')
    })

    it('unauthorized', async () => {
        await request(server)
            .get('/unauthorized')
            .expect(401, '"unauthorized"')
    })

    it('forbidden', async () => {
        await request(server)
            .get('/forbidden')
            .expect(403, '"forbidden"')
    })

    it('notFound', async () => {
        await request(server)
            .get('/notFound')
            .expect(404, '"notFound"')
    })

    it('conflict', async () => {
        await request(server)
            .get('/conflict')
            .expect(409, '"conflict"')
    })

    it('internalServerError', async () => {
        await request(server)
            .get('/internalServerError')
            .expect(500, '"internalServerError"')
    })

    it('response', async () => {
        await request(server)
            .get('/response')
            .expect(503, '"response"')
    })
})