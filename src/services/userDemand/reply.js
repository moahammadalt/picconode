import { insert } from 'utils/db';
import mailingTool from 'utils/mailing';
import config from 'config';

const userDemandReply = async req => {
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
  };
};

export default userDemandReply;