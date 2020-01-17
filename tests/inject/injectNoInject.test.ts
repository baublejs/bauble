import { Injectable, Injector } from '@bauble/inject'

@Injectable()
class TInjectable2 {
    public member = {}
}

@Injectable({inject: false})
class TInjectable {
    public member: {test?: any} = {}

    constructor(public notInjected: TInjectable2) {}
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

        expect(t.injected.notInjected).toBeUndefined()
    })
})