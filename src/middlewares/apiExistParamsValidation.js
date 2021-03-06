import pathToRegexp from 'path-to-regexp';

import routes from "config/routes";
import { responseStatuses } from "globals/constants";
import { checkValue, handleMissedParamsError } from "globals/helpers";

export default (req, res, next) => {

  if (req.method == "GET") {
    next();
    return;
  }
  
  const requestedPath =
    req.path[req.path.length - 1] === "/"
      ? req.path.substr(0, req.path.length - 1)
      : req.path;
  const requestedAPI = req.baseUrl + requestedPath;
  const routesObj = { ...routes.adminApi, ...routes.publicApi};
  const routeBodyParams = Object.values(routesObj).find(
    ({ url, type, bodyParams }) => url && !!pathToRegexp(url).exec(requestedAPI) && req.method === type && bodyParams
  );

  
  if (!routeBodyParams) {
    next();
  } else {
    const missedParams = routeBodyParams.bodyParams.filter(
      param => !checkValue(req.body[param])
    );

    missedParams.length > 0
      ? res.status(406).send({
          status: responseStatuses.fail,
          errorMessage: handleMissedParamsError(missedParams)
        })
      : next();
  }
};
