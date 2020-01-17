import { Injectable } from '@bauble/inject'

@Injectable()
class TInjectable {
    public member = {}
}

class TNonInjectable {
    public member = {}
}

@Injectable()
class TInject {
    constructor(public notInjected: TNonInjectable, public injected: TInjectable, public str: string) {}
}

describe('injectables injected with noninjectables', () => {
    it('should inject', async () => {
        // @ts-ignore
        const t = new TInject()
        expect(t.injected).toBeDefined()
        expect(t.injected.member).toBeTruthy()
        expect(typeof t.injected.member).toEqual('object')

        expect(t.notInjected).toBeUndefined()
        expect(t.str).toBeUndefined()
    })

    
    it('should inject with noninjectable', async () => {
        // @ts-ignore
        const t = new TInject(new TNonInjectable(), 'Test Str')
        expect(t.injected).toBeDefined()
        expect(t.injected.member).toBeTruthy()
        expect(typeof t.injected.member).toEqual('object')

        expect(t.notInjected).toBeTruthy()
        expect(t.str).toEqual('Test Str')
    })
})