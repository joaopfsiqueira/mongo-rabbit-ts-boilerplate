import mongoose from 'mongoose';
import { ILog } from '../../utils/logger/logger';
import { INoSqlConn } from '../../interfaces/infra/mongodb-interface';
import { ConnectionError } from '../../utils/error/connection-errors';

export class MongoDbConn implements INoSqlConn<Promise<void>> {
	private options: mongoose.ConnectOptions | undefined;
	private _connection!: mongoose.Mongoose;
	private logger: ILog;
	private serviceName = 'MongoR';

	constructor(log: ILog, options?: mongoose.ConnectOptions) {
		this.options = options;
		this.logger = log;
	}

	public get connection(): mongoose.Mongoose {
		return this._connection;
	}

	public set connection(value: mongoose.Mongoose) {
		this._connection = value;
	}

	public async connect(): Promise<void> {
		const uri = String(process.env.MONGO_URI);

		const defaultOptions = {};

		try {
			mongoose.connection.on('connected', () => {
				this.logger.log('info', `Connection ${this.serviceName} has been established`);
			});

			mongoose.connection.on('error', (error) => {
				const isError = error instanceof Error;

				throw new ConnectionError(this.serviceName, `${isError ? error.message : error}`);
			});

			mongoose.connection.on('disconnected', () => {
				throw new ConnectionError(this.serviceName, 'Connection Mongoose disconnected');
			});

			if (!uri) {
				throw new Error('A connection uri was not provided');
			}

			this.connection = await mongoose.connect(uri, !this.options ? defaultOptions : this.options);
		} catch (error) {
			const isError = error instanceof Error;

			throw new ConnectionError(this.serviceName, `can't connect to mongo - ${isError ? error.message : error}`);
		}
	}
}
