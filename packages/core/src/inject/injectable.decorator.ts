import "reflect-metadata"
import { InjectProvider } from "./inject.provider"
import { ParamTypes } from "./constants"

function getNewConstructor(constructor: Function, params: any[]) {
    return function(this: any, ...args: any[]) {
        const newArgs = params.slice(0)
        for (const arg of args) {
            for (let i = 0; i < newArgs.length; i++) {
                if (typeof newArgs[i] === 'undefined') {
                    (<any>newArgs)[i] = arg
                    break
                }
            }
        }
        return Reflect.construct(constructor, newArgs)
    }
}

function getParams(excludes: any[], metadata: any) {
    excludes = [...excludes, String, Number, Object, Array, Boolean]
    const params: any[] = [],
        excludedParams: any[] = []
    for (const meta of metadata) {
        let found = false
        for (const exclude of excludes) {
            if (exclude === meta) {
                found = true
                excludedParams.push(meta)
                params.push(undefined)
                break
            }
        }
        if (!found) {
            params.push(InjectProvider.instance.get(meta))
        }
    }
    return {params, excludedParams}
}

function setupNewConstructorPrototype(originalConstructor: Function, newConstructor: Function) {
    newConstructor.prototype = Object.create(originalConstructor.prototype)
    newConstructor.prototype.constructor = originalConstructor
    Object.defineProperty(newConstructor, 'name', {
        value: InjectProvider.instance.getName(<any>originalConstructor),
        enumerable: false,
        writable: false
    })
}

/**
 * Inject dependencies into constructor
 * 
 * @export
 * @param {IInjectOptions} [options={}] Options
 * @param {Function} constructor Constructor to inject into
 * @returns {Function} New constructor
 */
function Inject(options: IInjectableOptionsDefaulted, constructor: Function) {
    const metadata = Reflect.getMetadata(ParamTypes, constructor)
    if (metadata != null) {
        const params = getParams(options.exclude, metadata)
        const newConstructor = getNewConstructor(constructor, params.params)
        setupNewConstructorPrototype(constructor, newConstructor)

        Reflect.defineMetadata(ParamTypes, params.excludedParams, newConstructor)

        return <any>newConstructor
    } else {
        return <any>constructor
    }
}

/**
 * Decorate an object as Injectable into classes that are also decorated as Injectable
 * 
 * @export
 * @param {IInjectableOptions} [options={}] Options
 * @returns Decorator
 */
export function Injectable(options?: IInjectableOptions) {
    const opts: IInjectableOptionsDefaulted = InjectProvider.instance.getOptions(options, defaultOptions)
    return function(constructor: Function) {
        InjectProvider.instance.setName(<any>constructor)

        if (opts.inject === true) {
            constructor = Inject(opts, constructor)
        }

        InjectProvider.instance.register(<any>constructor)
        return <any>constructor
    }
}

/**
 * Injectable options
 * 
 * @export
 * @interface IInjectableOptions
 * @property {any[]} exclude Types to exclude from injection
 * @property {boolean} inject Whether or not the class should have injectables injected into it
 */
export interface IInjectableOptions {
    exclude?: any[]
    inject?: boolean
}

export interface IInjectableOptionsDefaulted {
    exclude: any[]
    inject: boolean
}

const defaultOptions: IInjectableOptionsDefaulted = {
    exclude: [],
    inject: true
}