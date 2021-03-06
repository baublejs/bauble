import { Bauble, Controller, Get, ok, created, noContent, notModified, badRequest, unauthorized, forbidden, notFound, conflict, internalServerError, Response } from '@bauble/routing'
import * as express from 'express'
import * as request from 'supertest'
import { Server } from 'http'

@Controller()
class TController {
    @Get()
    ok() {
        return ok('ok')
    }

    @Get()
    created() {
        return created('created')
    }

    @Get()
    noContent() {
        return noContent()
    }

    @Get()
    notModified() {
        return notModified()
    }

    @Get()
    badRequest() {
        return badRequest('badRequest')
    }

    @Get()
    unauthorized() {
        return unauthorized('unauthorized')
    }

    @Get()
    forbidden() {
        return forbidden('forbidden')
    }

    @Get()
    notFound() {
        return notFound('notFound')
    }

    @Get()
    conflict() {
        return conflict('conflict')
    }

    @Get()
    internalServerError() {
        return internalServerError('internalServerError')
    }

    @Get()
    response() {
        return new Response(503, 'response')
    }

    @Get()
    noResponse(req, res) {
        res.json('noResponse')
        return 'badResponse'
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

    it('noResponse', async () => {
        await request(server)
            .get('/noResponse')
            .expect(200, '"noResponse"')
    })
})