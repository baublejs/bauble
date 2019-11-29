import { Injectable, Injector } from "../../../packages/core/src/inject";

@Injectable()
class TInjectable {
    public member: {test?: any} = {}
}

@Injectable()
class TInject {
    constructor(public injected: TInjectable) {}
}

describe('injectables injected by injector', () => {
    it('should inject', async () => {
        const t = Injector.inject(TInject)
        expect(t.injected).toBeDefined()
        expect(t.injected.member).toBeTruthy()
        expect(typeof t.injected.member).toEqual('object')
    })
})