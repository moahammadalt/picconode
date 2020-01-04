import bcrypt from "bcrypt";

import { select } from "utils/db";
import JWT from "utils/jwt";

export default async (req) => {
  try {
		
    let result = await select({
      table: "admin_user",
      fields: ["*"],
      condition: `user_name = '${req.body.userName}'`
    });
		
		const match = await bcrypt.compare(
      req.body.password,
      result[0].password
    );
    if (match) {
			result = result[0];
      delete result.password;

      const payload = {
        user_name: result.user_name,
        id: result.id
      };
      result["token"] = JWT.sign(payload);

      return result;
    } else {
      throw {
        statusCode: 400,
        errorMessage: "User not matched"
      };
    }
  } catch (err) {
    throw err;
  }
};
