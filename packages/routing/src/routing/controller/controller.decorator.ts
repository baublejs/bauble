import "reflect-metadata"
import { Router } from "../router"
import { Injectable } from "../../inject/injectable.decorator"

export function Controller(basePath?: string) {
    return function(constructor: Function) {
        Router.registerController(Injectable()(<any>constructor), basePath)
        return constructor as any
    }
}