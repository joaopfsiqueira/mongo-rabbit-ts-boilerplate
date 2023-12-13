import amqp, { Channel } from 'amqplib';
import { ConnectionError, ConnectionNonexistentError } from '../../../utils/error/connection-errors';
import { IQueueSystemConnection } from '../queue-system-interface';
import { ILog } from '../../../utils/logger/logger';

export type IConnectionOptions = { uri: string } & amqp.Options.Connect;

export class RabbitmqConn implements IQueueSystemConnection<amqp.Connection, IConnectionOptions> {
	private _connection!: amqp.Connection;
	private serviceName = 'RabbitMQ';

	constructor(public options: IConnectionOptions, private logger: ILog) {}

	public async connect(): Promise<amqp.Connection | void> {
		try {
			this._connection = await amqp.connect(this.options.uri, this.options).then((conn) => {
				this.logger.log('info', `Connection ${this.serviceName} has been established`);
				return conn;
			});

			this._connection.on('error', (error) => {
				const isError = error instanceof Error;

				throw new ConnectionError(this.serviceName, `${isError ? error.message : error}`);
			});
			this._connection.on('close', async (error) => {
				const isError = error instanceof Error;

				throw new ConnectionError(this.serviceName, `${isError ? error.message : error}`);
			});

			return this._connection;
		} catch (error) {
			const isError = error instanceof Error;

			throw new ConnectionError(this.serviceName, `can't connect to rabbit - ${isError ? error.message : error}`);
		}
	}

	async getChannel(): Promise<Channel> {
		return await this._connection.createChannel();
	}

	getConnection(): amqp.Connection {
		if (this._connection) return this._connection;

		throw new ConnectionNonexistentError(this.serviceName, 'Connection not found in memory');
	}
}
