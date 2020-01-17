import { Controller } from "./controller/controller"
import { HttpMethod } from "./httpMethod"
import { Route } from "./route/route"
import { Express } from "express"
import { Response, Request } from "express-serve-static-core"
import { Response as BaubleResponse } from './response/response'
import { Injectable } from '@bauble/inject'

/**
 * A type that we can instantiate. Returns T
 */
export type NewableType<T> = {new(...args: any[]): T}

export class Router {
    private static controllers: Map<object, Controller> = new Map()

    public static registerController<T extends Function>(instanceType: NewableType<T>, basePath?: string) {
        const controller = this.controllers.get(instanceType.prototype)
        if (!controller) return
        controller.basePath = basePath
        controller.instance = new (Injectable()(instanceType))() as any
    }

    public static registerRoute(targetPrototype: any, httpMethod: HttpMethod, path: string, actionKey: string) {
        let controller = this.controllers.get(targetPrototype)
        if (!controller) {
            controller = new Controller()
            this.controllers.set(targetPrototype, controller)
        }
        controller.addRoute(new Route(httpMethod, path, actionKey))
    }

    private static respond(res: Response, response: any) {
        if (response instanceof BaubleResponse) {
            res.status(response.statusCode)
            res.json(response.response)
        }
    }

    public static bindRoutes(app: Express) {
        for (const [key, controller] of this.controllers) {
            for (const route of controller.routes) {
                const action = HttpMethod[route.method].toLowerCase()
                const path = `${Router.fixPath(controller.basePath || '')}${Router.fixPath(route.path)}`
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