import { responseStatuses } from 'globals/constants';
import { menuView } from 'services';

export const serviceHandler = async (req, res, next, service) => {
  try {
    const serviceResponse = await service(req);
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

export const viewServiceHandler = async service => {
  try {
		const menuViewData = await menuView();
		let response = {
			...menuViewData
		}
		if(service) {
			const serviceData = await service();
			response = {
				...response,
				serviceData
			}
		}
		
		return { data: response };

  } catch (error) {
    return {
      ...error
    };
  }
};
