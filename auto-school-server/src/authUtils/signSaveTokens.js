const jwt = require('jsonwebtoken');

exports.signSaveTokens = (res, userId, role) => {
  const accessToken = jwt.sign(
    { userId, role },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
    }
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
    }
  );

  const accessTokenCookieExpireDate = new Date(
    Date.now() + process.env.JWT_ACCESS_TOKEN_COOKIE_EXPIRES * 1000
  );

  res.cookie('access_token', accessToken, {
    expire: accessTokenCookieExpireDate,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  res.cookie('refresh_token', refreshToken, {
    maxAge: process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  return { accessToken, refreshToken, expire: accessTokenCookieExpireDate };
};
