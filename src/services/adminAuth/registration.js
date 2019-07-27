import bcrypt from 'bcrypt';

import { insert } from 'model/db';

export default async (req, res) => {
  const adminObj = {
		user_name: 'piccoloveliero',
		password: '123',
	};
	
	const hash = await bcrypt.hash(adminObj.password, 10);
	adminObj.password = hash;

	try {
		const response = await insert({
			table: `admin_usser`,
			fields: Object.keys(adminObj),
			values: Object.values(adminObj)
		});

		res.send(response);
	}
	catch (err) {
		res.status(500).send(err);
	}


	//db.select(`category`, ['id', 'category_name'])
};