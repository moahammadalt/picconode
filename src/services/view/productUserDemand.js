import { insert } from 'utils/db';

export const userDemandSend = async (req) => {

  const response = await insert({
		table: 'user_demand',
		fields: Object.keys(req.body),
		values: Object.values(req.body),
		data: req.body,
	});

	return {
		...req.body,
		id: response.id,
	};
};

export const userDemandList = async (req) => {

  /* const response = await insert({
		table: 'user_demand',
		fields: Object.keys(req.body),
		values: Object.values(req.body),
		data: req.body,
	});

	return {
		...req.body,
		id: response.id,
  }; */
  
  return {
    data: 'sss'
  }
};

export const userDemandReply = async (req) => {

  /* const response = await insert({
		table: 'user_demand',
		fields: Object.keys(req.body),
		values: Object.values(req.body),
		data: req.body,
	});

	return {
		...req.body,
		id: response.id,
  }; */
  
  return {
    data: 'sss'
  }
};