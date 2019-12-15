export class Response {
    constructor (public statusCode: number, public response?: any) { }
}

export function ok(response?: any) {
    return new Response(200, response)
}

export function created(response?: any) {
    return new Response(201, response)
}

export function noContent() {
    return new Response(204)
}

export function notModified() {
    return new Response(304)
}

export function badRequest(response?: any) {
    return new Response(400, response)
}

export function unauthorized(response?: any) {
    return new Response(401, response)
}

export function forbidden(response?: any) {
    return new Response(403, response)
}

export function notFound(response?: any) {
    return new Response(404, response)
}

export function conflict(response?: any) {
    return new Response(409, response)
}

export function internalServerError(response?: any) {
    return new Response(500, response)
}