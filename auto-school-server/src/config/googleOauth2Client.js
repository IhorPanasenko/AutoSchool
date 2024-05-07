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

const googleCalendar = google.calendar({ version: 'v3', auth: oauth2Client });

module.exports = { oauth2Client, generateGoogleAuthUrl, googleCalendar };
