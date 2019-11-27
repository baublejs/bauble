export function getOptions<T extends Object>(options: T, defaults: T): T {
    if (options != null && typeof options === 'object') {
        for (let key in defaults) {
            if (typeof options[key] === "object") {
                options[key] = getOptions(<any>options[key], <any>defaults[key]);
            } else if (defaults.hasOwnProperty(key)) {
                options[key] = options[key] !== void 0 ? options[key] : defaults[key];
            }
        }
        return options;
    }
    return defaults;
}