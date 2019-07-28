
import { responseStatuses } from "globals/constants";

export const serviceHandler = async (req, res, next, service) => {
	try {
		const serviceResponse = await service(req);
		res.send({
			status: responseStatuses.success,
			data: serviceResponse,
		})
	}
	catch (error) {
		res.status(error.statusCode || 500).send({
			status: responseStatuses.fail,
			...error,
		});
	}
}