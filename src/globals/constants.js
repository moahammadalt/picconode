import path from 'path';
import config from 'config';

export const responseStatuses = {
	success: 'SUCCESS',
	fail: 'FAIL',
};

export const errorMessages = {
	notFound: 'Product not found',
	outOfStock: 'This product is out of stock',
	GenericError: 'GENERIC_ERROR',
};

export const viewsPath = path.join(path.resolve('.'), config.PUBLIC_VIEW_PATH);