import routes from "config/routes";
import { serviceHandler } from "utils/service";

import {
  emailUserRegister,
  emailUserLogOut,
  emailUserLogIn,
  emailUserForgottenPasswordSend,
  emailUserForgottenPasswordReset,
  emailUserGetList,
} from "services";

const emailUserAPI = router => {
  const { adminApi, publicApi } = routes;

  router.post(publicApi.emailUserRegister.url, (...arg) => {
    serviceHandler(...arg, emailUserRegister);
  });

  router.post(publicApi.emailUserLogOut.url, (...arg) => {
    serviceHandler(...arg, emailUserLogOut);
  });

  router.post(publicApi.emailUserLogIn.url, (...arg) => {
    serviceHandler(...arg, emailUserLogIn);
  });

  router.post(publicApi.emailUserForgottenPasswordSend.url, (...arg) => {
    serviceHandler(...arg, emailUserForgottenPasswordSend);
  });

  router.post(publicApi.emailUserForgottenPasswordReset.url, (...arg) => {
    serviceHandler(...arg, emailUserForgottenPasswordReset);
  });

  router.get(adminApi.emailUserList.url, (...arg) => {
    serviceHandler(...arg, emailUserGetList);
  });
};

export default emailUserAPI;
