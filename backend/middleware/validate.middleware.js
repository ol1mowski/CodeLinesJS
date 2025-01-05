export const validateAuth = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email i hasło są wymagane'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: 'Hasło musi mieć co najmniej 6 znaków'
    });
  }

  next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: 'Email jest wymagany'
    });
  }

  next();
}; 