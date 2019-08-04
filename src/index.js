import { expressServer, DBCon, hbsViews } from 'loaders';

expressServer.connect();

hbsViews.initialize();

DBCon.connect();