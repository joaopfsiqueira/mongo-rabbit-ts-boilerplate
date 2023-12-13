import { SaveSample } from '../../src/use-cases/save-sample'
import { Sample } from '../../src/entities/sample'
import { describe, expect, it } from 'vitest'
import { InMemorySampleRepository } from '../../src/repositories/in-memory/in-memory-sample-repository'

describe('usecase save sample', () => {
    it('save an sample and return sample object', async () => {
        const sampleRepository = new InMemorySampleRepository()
        const sample = new SaveSample(sampleRepository)

        expect(
            sample.execute({
                name: 'teste',
                status: 1,
                created_at: new Date(),
            })
        ).resolves.toBeInstanceOf(Sample)
    })

    it('not save an sample and return throw name invalid', () => {
        const sampleRepository = new InMemorySampleRepository()
        const sample = new SaveSample(sampleRepository)

        expect(
            sample.execute({
                name: 'sds',
                status: 1,
                created_at: new Date(),
            })
        ).rejects.toThrow()
    })

    it('not save an sample and return throw already exist', async () => {
        const sampleRepository = new InMemorySampleRepository()
        const sample = new SaveSample(sampleRepository)

        await sample.execute({
            name: 'teste',
            status: 1,
            created_at: new Date(),
        })

        expect(
            sample.execute({ name: 'teste', status: 2, created_at: new Date() })
        ).rejects.toBeInstanceOf(Error)
    })
})
