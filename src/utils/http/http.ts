import http from 'node:http'

export interface IHttp {
    connection(): void
}

export type TModule =
    | http.RequestListener<
          typeof http.IncomingMessage,
          typeof http.ServerResponse
      >
    | undefined
export type TOptions = http.ServerOptions<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
>

export type Server = http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
>

export class Http implements IHttp {
    public connection(options?: TOptions, module?: TModule): Server {
        let conn: http.Server

        if (module) {
            conn = http.createServer(options ? options : {}, module)
        } else {
            conn = http.createServer(
                (req: http.IncomingMessage, res: http.ServerResponse) => {
                    const { url, method } = req

                    if (url === '/ping' && method === 'GET') {
                        res.setHeader('Content-Type', 'text/html')
                        res.writeHead(200)
                        res.end('pong')
                    }
                }
            )
        }

        return conn
    }

    public listen(port: string | undefined, conn: http.Server): void {
        void conn.listen(port, () =>
            console.info(`Server is running in port: ${port}`)
        )
    }
}
