/**
 * A type that we can instantiate. Returns T
 */
export type NewableType<T> = {new(...args: any[]): T}

export abstract class InjectService {
    private static injectables: Map<any, any> = new Map()

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
        if (this.injectables.has(instanceType)) {
            let injectable = this.injectables.get(instanceType)
            if (typeof injectable === 'function') {
                injectable = new (injectable)()
                this.injectables.set(instanceType, injectable)
            }
            return injectable
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
        this.injectables.set(instanceType, instanceType)
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