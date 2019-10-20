export const deletePasswordResetCode = req => {
  delete req.session.passwordResetCode;
  req.session.save(function(err) {
    console.log('err: ', err);
  })
};

export const savePasswordResetCode = (req, code) => {
  req.session.passwordResetCode = code;

  setTimeout(() => {
    deletePasswordResetCode(req);
  }, 60 * 1000 * 5);
};

export const getPasswordResetCode = req => req.session.passwordResetCode;