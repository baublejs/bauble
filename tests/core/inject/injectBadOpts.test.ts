import { Injectable, Injector } from "../../../packages/routing/src/inject";

@Injectable()
class TInjectable {
    public member: {test?: any} = {}
}

// @ts-ignore
@Injectable({exclude: null})
class TInject {
    constructor(public injected: TInjectable) {}
}

describe('injectables injected with bad options', () => {
    it('should inject with bad exclude', async () => {
        const t = Injector.inject(TInject)
        expect(t.injected).toBeDefined()
        expect(t.injected.member).toBeTruthy()
        expect(typeof t.injected.member).toEqual('object')
    })
})