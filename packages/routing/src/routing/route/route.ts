import { HttpMethod } from "../httpMethod"

export class Route {
    constructor(method: HttpMethod, path: string, action: string) {
        this.method = method
        this.path = path
        this.action = action
    }

    method: HttpMethod
    path: string
    action: string
}