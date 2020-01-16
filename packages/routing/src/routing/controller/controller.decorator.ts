import "reflect-metadata"
import { Router } from "../router"

export function Controller(basePath?: string) {
    return function(constructor: Function) {
        Router.registerController(<any>constructor, basePath)
        return constructor as any
    }
}