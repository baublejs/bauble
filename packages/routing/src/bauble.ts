import {Express} from "express"
import { Router } from "./router"

export abstract class Bauble {
    static start(app: Express) {
        this.bindRoutes(app)
    }

    static bindRoutes(app: Express) {
        Router.bindRoutes(app)
    }
}