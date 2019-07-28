import bcrypt from 'bcrypt';

import { insert } from 'utils/db';
import JWT from 'utils/jwt';
import config from 'config';

export default async (req, res) => {
  const adminObj = {
		user_name: config.ADMIN.userName,
		password: config.ADMIN.password,
	};
	
	const hash = await bcrypt.hash(adminObj.password, 10);
	adminObj.password = hash;

	try {
		const response = await insert({
			table: 'admin_user',
			fields: Object.keys(adminObj),
			values: Object.values(adminObj),
			data: adminObj,
		});

		const payload = {
			user_name: adminObj.user_name,
			id: response.data.id
		};
		const token = JWT.sign(payload);

		res.send({
			...response,
			token,
		});
	}
	catch (err) {
		res.status(500).send(err);
	}
};