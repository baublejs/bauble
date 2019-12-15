import { Route } from "../route/route"

export class Controller {
    constructor() { }

    basePath?: string
    instance: {[key: string]: Function} = {}
    routes: Route[] = []

    addRoute(route: Route) {
        this.routes.push(route)
    }
}