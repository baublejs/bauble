import { Injectable } from '@bauble/inject'

@Injectable()
class TInjectable {
    public member = {}
}

@Injectable()
class TInjectable2 {
    public member = {}

    constructor(public injected: TInjectable) {}
}

@Injectable()
class TInject {
    constructor(public injected: TInjectable) {}
}

@Injectable()
class TInject2 {
    constructor(public injected: TInjectable2) {}
}

describe('injectables injected', () => {
    it('should inject', async () => {
        // @ts-ignore
        const t = new TInject()
        expect(t.injected).toBeDefined()
        expect(t.injected.member).toBeTruthy()
        expect(typeof t.injected.member).toEqual('object')
    })

    it('should inject deep', async () => {
        // @ts-ignore
        const t = new TInject2()
        expect(t.injected).toBeDefined()
        expect(t.injected.member).toBeTruthy()
        expect(typeof t.injected.member).toEqual('object')

        expect(t.injected.injected).toBeDefined()
        expect(t.injected.injected.member).toBeTruthy()
        expect(typeof t.injected.injected.member).toEqual('object')
    })

    it('should be singleton', async () => {
        // @ts-ignore
        (new TInject()).injected.member.test = {}
        // @ts-ignore
        const t = new TInject2()
        expect(t.injected).toBeDefined()
        expect(t.injected.member).toBeTruthy()
        expect(typeof t.injected.member).toEqual('object')

        expect(t.injected.injected).toBeDefined()
        expect(t.injected.injected.member).toBeTruthy()
        expect(typeof t.injected.injected.member).toEqual('object')

        expect(t.injected.injected.member.test).toBeDefined()
        expect(typeof t.injected.injected.member.test).toEqual('object')
    })
})