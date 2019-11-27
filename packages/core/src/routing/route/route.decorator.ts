import { HttpMethod } from "../httpMethod"
import { Router } from "../router"

export function Route(httpMethod: HttpMethod, path?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (path == null) path = propertyKey
        console.log(path)
        Router.instance.registerRoute(target, httpMethod, path, propertyKey)
    }
}

export function Get(path?: string) {
    return Route(HttpMethod.GET, path)
}

export function Post(path?: string) {
    return Route(HttpMethod.POST, path)
}

export function Put(path?: string) {
    return Route(HttpMethod.PUT, path)
}

export function Patch(path?: string) {
    return Route(HttpMethod.PATCH, path)
}

export function Delete(path?: string) {
    return Route(HttpMethod.DELETE, path)
}