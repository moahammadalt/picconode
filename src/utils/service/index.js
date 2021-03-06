import { responseStatuses, errorMessages, viewsPath } from 'globals/constants';
import { sendClientAlarm } from 'globals/helpers';
import { headerView } from 'services';
import logger from 'utils/logger';

export const serviceHandler = async (req, res, next, service) => {
  try {
    const serviceResponse = await service({...req, ignoreErrorRender: true});
    res.send({
      status: responseStatuses.success,
      data: serviceResponse
    });
  } catch (error) {
    res.status(error.statusCode || 500).send({
      status: responseStatuses.fail,
      ...error
    });
  }
};

export const viewServiceHandler = async ({req, res, next, viewPathUrl, service}) => {
  try {
		const headerViewData = await headerView(req);
		let response = {
			...headerViewData
    }
    req.headerViewData = {...headerViewData};
		if(service) {
      req.fromView = true;
			const serviceData = await service(req);
			response = {
				...response,
				...serviceData,
			}
    }
    
    res.render(viewsPath + viewPathUrl, { data: response });
		
  } catch (err) {
    console.log('err: ', err);
    let error ;
    if(typeof err === 'object' && !err.message) {
      error = JSON.stringify(err);
    }
    else {
      error = err.message
    }
    logger.error(error);
    
    if(err.errorRedirectPath) {
      res.render(viewsPath + err.errorRedirectPath, {
        data: {
          errorMessage: err.errorMessage || errorMessages.GenericError
        },
      });
    }
    else{
      res.send(sendClientAlarm(err.errorMessage));
    }
  }
};
