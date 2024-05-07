const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

const generateGoogleAuthUrl = (scope) => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope,
  });
};

module.exports = { oauth2Client, generateGoogleAuthUrl };
