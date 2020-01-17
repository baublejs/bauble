import { Injectable, Injector } from '@bauble/inject'

@Injectable()
class TInjectable {
    public member: {test?: any} = {}

    getThis() {
        return this
    }
}

// @ts-ignore
@Injectable({exclude: null})
class TInject {
    constructor(public injected: TInjectable) {}
}

describe('injectables can access this', () => {
    it('should have this', async () => {
        const t = Injector.inject(TInject)
        expect(t.injected).toBeDefined()
        expect(t.injected.member).toBeTruthy()
        expect(typeof t.injected.member).toEqual('object')
        
        expect(t.injected.getThis()).toStrictEqual(t.injected)
    })
})