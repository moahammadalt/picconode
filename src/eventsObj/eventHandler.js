import eventObj from 'events';

export const eventHandler = new eventObj.EventEmitter();

export const events = {
	DBConnectionCreated: 'DB_CONNECTION_CREATED',
}