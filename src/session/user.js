import { checkValue } from 'globals/helpers';

export const saveUserTokenSession = (req, userToken) => {
  if(!checkValue(userToken) || checkValue(req.session.user)) {
    return;
  }

  req.session.userToken = userToken;
};

export const deleteLoggedInUserTokenSession = req => {
  delete req.session.userToken;
};

export const getLoggedInUserTokenSession = req => req.session.userToken;