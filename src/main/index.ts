import 'dotenv/config';
import { Http } from '../utils/http/http';
import { Logger } from '../utils/logger/logger';
import { MongoDbConn } from '../infra/mongoose/mongodb';
import { RabbitmqConn } from '../infra/queue-system/rabbitmq/rabbitmq';

/**
 * Main Function
 */
export async function bootstrap(): Promise<void> {
	const http = new Http();

	/**
	 * inicializando logger, mongo e rabbit
	 */
	const logger = new Logger();
	const mongo = new MongoDbConn(logger);
	const rabbitmqConn = new RabbitmqConn({ uri: process.env.RABBIT_MQ_URI }, logger);

	/**
	 * up connections
	 */

	await mongo.connect();
	await rabbitmqConn.connect();

	/**
	 * Get Connection on Channel - Rabbit
	 */
	// const channel = await rabbitmqConn.getChannel();

	http.listen(process.env.PORT, http.connection());
}

bootstrap();
