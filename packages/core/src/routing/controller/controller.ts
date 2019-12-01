import { Route } from "../route/route"

export class Controller {
    constructor() { }

    basePath?: string
    instance: any
    routes: Route[] = []

    addRoute(route: Route) {
        this.routes.push(route)
    }
}