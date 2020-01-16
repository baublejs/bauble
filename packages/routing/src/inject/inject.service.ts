const Symbol = require('es6-symbol')
import { KeyProperty } from "./constants"

let keyIndex = 0

/**
 * A type that we can instantiate. Returns T
 */
export type NewableType<T> = {new(...args: any[]): T}

export abstract class InjectService {
    private static injectables: any = {}

    private static readonly SYMBOL_ID = Symbol('Id')

    /**
     * Set the key a of a newable type
     * 
     * @param {NewableType<any>} instanceType Newable instance type
     * 
     * @memberOf InjectService
     */
    public static setKey(instanceType: NewableType<any>): void {
        (<any>instanceType)[KeyProperty] = InjectService.getKey(<any>instanceType)
    }

    public static getKey(target: Function): string {
        return (<any>target)[KeyProperty] || ++keyIndex
    }

    /**
     * Get an instance of an injectable
     * 
     * @template T Type of instance
     * @param {NewableType<any>} instanceType Instance type to get
     * @returns Instance of injectable or null
     * 
     * @memberOf InjectService
     */
    public static get<T>(instanceType: NewableType<T>): T | undefined {
        const key = (<any>instanceType)[this.SYMBOL_ID]
        if (this.injectables[key] != null) {
            if (typeof this.injectables[key] === 'function') {
                return this.injectables[key] = new (this.injectables[key])()
            }
            return this.injectables[key]
        }
        return undefined
    }

    /**
     * Register an injectable
     * 
     * @template T Type of injectable
     * @param {NewableType<T>} instanceType Instance type to create
     * 
     * @memberOf InjectService
     */
    public static register<T extends Function>(instanceType: NewableType<T>) {
        const key = (<any>instanceType)[this.SYMBOL_ID] || Symbol(InjectService.getKey(instanceType))
        ;(<any>instanceType)[this.SYMBOL_ID] = key
        this.injectables[key] = instanceType
    }

    public static getOptions<T, TReturn>(options: T, defaults: T): TReturn {
        if (options != null && typeof options === 'object') {
            for (const key of Object.keys(defaults)) {
                if (typeof options[key] === "object") {
                    options[key] = this.getOptions(<any>options[key], <any>defaults[key])
                } else {
                    options[key] = options[key] !== undefined ? options[key] : defaults[key]
                }
            }
            return options as any
        }
        return defaults as any
    }
}