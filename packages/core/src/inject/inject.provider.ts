var Symbol = require('es6-symbol')
import { NameProperty } from "./constants"

/**
 * A type that we can instantiate. Returns T
 */
export type NewableType<T> = {new(...args: any[]): T}

export class InjectProvider {
    private static _instance: InjectProvider

    private injectables: any = {}

    private readonly SYMBOL_ID = Symbol('Id')

    private constructor() { }

    /**
     * Instance of InjectProvider
     * 
     * @readonly
     * @static
     * @type {InjectProvider}
     * @memberOf InjectProvider
     */
    public static get Instance(): InjectProvider {
        return this._instance || (this._instance = new this())
    }

    /**
     * Set the name a of a newable type
     * 
     * @param {string} namespace Namespace to prepend
     * @param {NewableType<any>} instanceType Newable instance type
     * 
     * @memberOf InjectProvider
     */
    public setName(instanceType: NewableType<any>): void {
        (<any>instanceType)[NameProperty] = InjectProvider.Instance.getName(<any>instanceType)
    }

    public getName(target: Function): string {
        return (<any>target)[NameProperty] || (<any>target).name || (<any>target).toString().match(/^function\s*([^\s(]+)/)[1]
    }

    /**
     * Get an instance of an injectable
     * 
     * @template T Type of instance
     * @param {NewableType<any>} instanceType Instance type to get
     * @returns Instance of injectable or null
     * 
     * @memberOf InjectProvider
     */
    public get<T>(instanceType: NewableType<T>): T | undefined {
        var key = (<any>instanceType)[this.SYMBOL_ID]
        if (this.injectables[key] != null) {
            if (typeof this.injectables[key] === 'function') {
                console.log(this.get.toString())
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
     * @param {Symbol?} key Unique ID for instance. Use when defining a new constructor for an existing injectable
     * 
     * @memberOf InjectProvider
     */
    public register<T extends Function>(instanceType: NewableType<T>, key?: any) {
        if (key == null) {
            key = (<any>instanceType)[this.SYMBOL_ID] || Symbol(InjectProvider.Instance.getName(instanceType))
        }
        (<any>instanceType)[this.SYMBOL_ID] = key
        this.injectables[key] = instanceType
    }
}