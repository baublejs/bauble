import {Express} from "express"
import { Router } from "./routing/router"
import { Route } from "./routing/route/route"
import { Controller } from "./routing/controller/controller"
import { HttpMethod } from "./routing/httpMethod"

export abstract class Bauble {
    static start(app: Express) {
        this.bindRoutes(app)
    }

    static bindRoutes(app: Express) {
        throw new Error('ERROR')
        Router.instance.bindRoutes(app)
    }
}