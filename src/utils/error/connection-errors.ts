export class ConnectionError extends Error {
	service: string;
	constructor(service: string, message: string) {
		super(`Error connecting service ${service}`);
		this.name = 'CONNECTION_ERROR';
		this.message = message;
		this.service = service;
	}
}

export class ConnectionClosedError extends Error {
	service: string;
	constructor(service: string, message: string) {
		super(`Error connection from ${service} is not supposed to close`);
		this.name = 'CONNECTION_CLOSED_ERROR';
		this.message = message;
		this.service = service;
	}
}

export class ConnectionNonexistentError extends Error {
	service: string;
	constructor(service: string, message: string) {
		super(`Error connection nonexistent for ${service}`);
		this.name = 'CONNECTION_NONEXISTENT_ERROR';
		this.message = message;
		this.service = service;
	}
}
