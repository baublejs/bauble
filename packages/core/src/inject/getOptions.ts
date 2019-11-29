export function getOptions<T extends Object>(options: T, defaults: T): T {
    if (options != null && typeof options === 'object') {
        for (const key of Object.keys(defaults)) {
            if (typeof options[key] === "object") {
                options[key] = getOptions(<any>options[key], <any>defaults[key])
            } else {
                options[key] = options[key] !== void 0 ? options[key] : defaults[key]
            }
        }
        return options
    }
    return defaults
}