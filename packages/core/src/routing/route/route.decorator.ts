import { HttpMethod } from "../httpMethod"
import { Router } from "../router"

export function Route(httpMethod: HttpMethod, path?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (path == null) path = propertyKey
        Router.registerRoute(target, httpMethod, path, propertyKey)
    }
}

export function Get(path?: string) {
    return Route(HttpMethod.Get, path)
}

export function Post(path?: string) {
    return Route(HttpMethod.Post, path)
}

export function Put(path?: string) {
    return Route(HttpMethod.Put, path)
}

export function Patch(path?: string) {
    return Route(HttpMethod.Patch, path)
}

export function Delete(path?: string) {
    return Route(HttpMethod.Delete, path)
}