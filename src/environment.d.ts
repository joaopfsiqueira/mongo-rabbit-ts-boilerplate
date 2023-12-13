declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly PORT: string;
			readonly TIMEZONE: string;

			readonly RABBIT_MQ_URI: string;
			readonly RABBIT_MQ_USERNAME: string;
			readonly RABBIT_MQ_PASSWORD: string;
			readonly RABBIT_MQ_QUEUE: string;
			readonly RABBIT_MQ_PREFETCH: string;

			readonly MONGO_URI: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
