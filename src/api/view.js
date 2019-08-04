import routes from "config/routes";
import path from 'path';
import config from 'config';
import { viewServiceHandler } from "utils/service";

import {
  menuView,
} from "services";

export default router => {
  const { publicApi } = routes;
  const viewsPath = path.join(path.resolve('.'), config.PUBLIC_VIEW_PATH);

  router.get(publicApi.home.url, async (req, res, next) => {    
    res.render(viewsPath + publicApi.home.path, await viewServiceHandler());
  });
};
