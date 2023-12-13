import { Sample } from '../../src/entities/sample'
import { describe, expect, it } from 'vitest'

describe('sample entitie', () => {
    it('create an sample entitie', () => {
        const sample = new Sample({
            name: 'teste',
            status: 1,
            created_at: new Date(),
        })

        expect(sample).toBeInstanceOf(Sample)
    })

    it('should not instantiate because the name is not valid', () => {
        expect(() => {
            return new Sample({
                name: 'fafa',
                status: 1,
                created_at: new Date(),
            })
        }).toThrow()
    })

    it('get an sample entitie name', () => {
        const sample = new Sample({
            name: 'teste',
            status: 1,
            created_at: new Date(),
        })

        expect(sample.sample_name).toEqual('teste')
    })
})
