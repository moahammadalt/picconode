import { deleteLoggedInUserTokenSession } from 'session/user';

export default async (req) => {  
  try {
    deleteLoggedInUserTokenSession(req);

    return {
      message: 'user has been logged out!'
    };
  } catch (err) {
    throw err;
  }
};