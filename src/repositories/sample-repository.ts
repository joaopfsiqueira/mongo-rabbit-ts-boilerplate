import { Sample } from '../entities/sample'

export interface SampleRepository {
    save(sample: Sample): Promise<void>
    findSample(name: string): Promise<Sample | undefined>
}
