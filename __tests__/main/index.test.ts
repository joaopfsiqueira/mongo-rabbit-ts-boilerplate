import { afterAll, describe, expect, it, vi } from 'vitest'
import { bootstrap } from '../../src/main/index'

describe('main index', () => {
    it('call bootstrap to start project', () => {
        const main = {
            bootstrap: bootstrap,
        }

        const result = vi.spyOn(main, 'bootstrap').mockImplementation(() => {})

        main.bootstrap()

        expect(result).toHaveBeenCalledTimes(1)
    })
})
