export interface IQueueSystemConnection<TConnection, TConnectionOptions> {
	options: TConnectionOptions;

	connect(): Promise<TConnection | void>;

	getConnection(): TConnection;
}
