import { Controller } from "./controller/controller"
import { HttpMethod } from "./httpMethod"
import { Route } from "./route/route"
import { Express } from "express"
import { Response, Request } from "express-serve-static-core"
import { Response as BaubleResponse } from './response/response'
const Symbol = require('es6-symbol')

const keyGenerator = (function*() {
    let i = 0
    while (true) yield ++i
})()

function getKeyIndex() {
    return keyGenerator.next().value
}

/**
 * A type that we can instantiate. Returns T
 */
export type NewableType<T> = {new(...args: any[]): T}

export class Router {
    private static controllers: {[key: string]: Controller} = {}

    private static readonly SYMBOL_ID = Symbol('Id')

    public static getControllers() {
        return this.controllers
    }

    public static registerController<T extends Function>(instanceType: NewableType<T>, basePath?: string) {
        let key = instanceType.prototype[this.SYMBOL_ID] || getKeyIndex()
        if (this.controllers[key] == null) return
        let controller = this.controllers[key]
        controller.basePath = basePath
        controller.instance = new (instanceType)() as any
    }

    public static registerRoute(targetPrototype: any, httpMethod: HttpMethod, path: string, actionKey: string) {
        let key = targetPrototype[this.SYMBOL_ID] = targetPrototype[this.SYMBOL_ID] || getKeyIndex()
        if (this.controllers[key] == null) this.controllers[key] = new Controller()
        this.controllers[key].addRoute(new Route(httpMethod, path, actionKey))
    }

    private static respond(res: Response, response: any) {
        if (response instanceof BaubleResponse) {
            res.status(response.statusCode)
            res.json(response.response)
        }
    }

    public static bindRoutes(app: Express) {
        const controllers = Router.getControllers()
        for (let key of Object.keys(controllers)) {
            let controller = controllers[key]
            for (let route of controller.routes) {
                let action = HttpMethod[route.method].toLowerCase()
                let path = `${Router.fixPath(controller.basePath || '')}${Router.fixPath(route.path)}`
                //@ts-ignore
                app[action](path, function (req: Request, res: Response) {
                    const result = controller.instance[route.action].apply(controller.instance, arguments)
                    if (typeof result.then === 'function') {
                        result.then(response => {
                            Router.respond(res, response)
                        })
                    } else {
                        Router.respond(res, result)
                    }
                })
            }
        }
    }

    private static fixPath(path: string) {
        if (path.lastIndexOf('/', 0) !== 0) path = `/${path}`
        if (path.lastIndexOf('/') === path.length - 1) path = path.slice(0, -1)
        return path
    }
}