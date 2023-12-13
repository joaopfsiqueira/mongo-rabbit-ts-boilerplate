import supertest from 'supertest'
import { describe, expect, test, vi } from 'vitest'
import { Http, TModule } from '../../src/utils/http/http'
import Mhttp from 'node:http'

describe('Utils Http', () => {
    test('GET /ping', async () => {
        const http = new Http()

        const conn = http.connection()

        const result = await supertest(conn).get('/ping')

        expect(result.headers['content-type']).toEqual('text/html')
        expect(result.status).toEqual(200)
        expect(result.text).toEqual('pong')
    })

    test('Pass module to http server', () => {
        const http = new Http()

        const module: TModule = (req, res) => {}

        const conn = http.connection(
            {
                keepAlive: false,
            },
            module
        )

        expect(conn).toBeInstanceOf(
            Mhttp.Server<
                typeof Mhttp.IncomingMessage,
                typeof Mhttp.ServerResponse
            >
        )
    })
})
