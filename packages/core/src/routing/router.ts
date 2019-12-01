import { Controller } from "./controller/controller"
import { HttpMethod } from "./httpMethod"
import { Route } from "./route/route"
import { Express } from "express"
const Symbol = require('es6-symbol')

let keyIndex = 1

/**
 * A type that we can instantiate. Returns T
 */
export type NewableType<T> = {new(...args: any[]): T}

export class Router {
    private static _instance: Router

    private controllers: {[key: string]: Controller} = {}

    private readonly SYMBOL_ID = Symbol('Id')

    private constructor() { }

    /**
     * Instance of Router
     * 
     * @readonly
     * @static
     * @type {Router}
     * @memberOf Router
     */
    public static get instance(): Router {
        return this._instance || (this._instance = new this())
    }

    public getControllers() {
        return this.controllers
    }

    private getKey() {
        return keyIndex++
    }

    public registerController<T extends Function>(instanceType: NewableType<T>, basePath?: string) {
        let key = instanceType.prototype[this.SYMBOL_ID] || this.getKey()
        if (this.controllers[key] == null) return
        let controller = this.controllers[key]
        controller.basePath = basePath
        controller.instance = new (instanceType)()
    }

    public registerRoute(targetPrototype: any, httpMethod: HttpMethod, path: string, actionKey: string) {
        let key = targetPrototype[this.SYMBOL_ID] = targetPrototype[this.SYMBOL_ID] || this.getKey()
        if (this.controllers[key] == null) this.controllers[key] = new Controller()
        this.controllers[key].addRoute(new Route(httpMethod, path, actionKey))
    }

    public bindRoutes(app: Express) {
        const controllers = Router.instance.getControllers()
        for (let key of Object.keys(controllers)) {
            let controller = controllers[key]
            for (let route of controller.routes) {
                let action = HttpMethod[route.method].toLowerCase()
                let path = `${Router.fixPath(controller.basePath || '')}${Router.fixPath(route.path)}`
                //@ts-ignore
                app[action](path, controller.instance[route.action].bind(controller.instance))
            }
        }
    }

    private static fixPath(path: string) {
        if (path.lastIndexOf('/', 0) !== 0) path = `/${path}`
        if (path.lastIndexOf('/') === path.length - 1) path = path.slice(0, -1)
        return path
    }
}