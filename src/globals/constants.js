import path from 'path';
import config from 'config';

export const responseStatuses = {
	success: 'SUCCESS',
	fail: 'FAIL',
};

export const errorMessages = {
	notFound: 'NOT_FOUND',
	GenericError: 'GENERIC_ERROR',
};

export const viewsPath = path.join(path.resolve('.'), config.PUBLIC_VIEW_PATH);