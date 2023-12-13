import { Sample } from '../../entities/sample'
import { SampleRepository } from '../sample-repository'

export class InMemorySampleRepository implements SampleRepository {
    private samples: Sample[] = []

    async save(sample: Sample): Promise<void> {
        this.samples.push(sample)
    }

    async findSample(name: string): Promise<Sample | undefined> {
        const sample = this.samples.find((value) => value.sample_name == name)

        return sample
    }
}
