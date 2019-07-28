import bcrypt from "bcrypt";

import { select } from "utils/db";
import JWT from "utils/jwt";
import { responseStatuses } from "globals/constants";

export default async (req, res) => {
  try {
    const result = await select({
      table: "admin_user",
      fields: ["*"],
      condition: `user_name = '${req.body.userName}'`
    });

    const match = await bcrypt.compare(
      req.body.password,
      result.data[0].password
		);

		if(match) {
			result.data = result.data[0];
			delete result.data.password;

			const payload = {
				user_name: result.data.user_name,
				id: result.data.id
			};
			result.data['token'] = JWT.sign(payload);

			res.send(result)
		}
		else {
			res.status(400).send({
				status: responseStatuses.fail,
				errorMessage: "user nor matched"
			});
		}
  } catch (err) {
    res.status(500).send(err);
  }
};
