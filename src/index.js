import { expressServer, databaseCon } from 'loaders';

expressServer.connect();

databaseCon.connect();