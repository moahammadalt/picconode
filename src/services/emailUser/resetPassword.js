import bcrypt from "bcrypt";

import JWT from "utils/jwt";
import { select } from 'utils/db';
import { saveUserTokenSession } from 'session/user';

export default async (req) => {
  try {
    return { ss: 'hiii'}
    
  } catch (err) {
    console.log('err: ', err);
    throw err;
  }
};