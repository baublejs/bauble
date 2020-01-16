import { Injectable } from "../../../packages/routing/src/inject";

@Injectable()
class TInjectable {
    public member = {}
}

@Injectable()
class TInjectableNamespace {
    public member = {test: {}}
}

// @ts-ignore
@Injectable({exclude: [TInjectableNamespace]})
class TInject {
    constructor(public injected: TInjectable, public notInjected: TInjectableNamespace) {}
}

describe('injectables injected', () => {
    it('should inject', async () => {
        // @ts-ignore
        const t = new TInject()
        expect(t.injected).toBeDefined()
        expect(t.injected.member).toBeTruthy()
        expect(typeof t.injected.member).toEqual('object')

        expect (t.notInjected).toBeUndefined()
    })
})