import "reflect-metadata"
import { Router } from "../router"
import { Injectable } from "../../inject"

export function Controller(basePath?: string) {
    return function(constructor: Function) {
        Router.instance.registerController(Injectable()(<any>constructor), basePath)
        return constructor as any
    }
}