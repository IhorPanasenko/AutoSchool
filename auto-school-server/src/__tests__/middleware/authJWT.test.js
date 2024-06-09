require('dotenv').config();
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('../../middlewares/authenticateJWT.js');
const UserAccountModel = require('../../models/userAccount.js');
const UserLoginModel = require('../../models/userLogin.js');

describe('authenticateJWT', () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      cookies: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  describe('given no access token', () => {
    it('should return status 401', () => {
      authenticateJWT(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'You are not logged in' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('given not valid access token', () => {
    it('should return status 403', () => {
      req.cookies.access_token = 'invalid_access_token';

      jwt.verify = jest
        .fn()
        .mockImplementationOnce((token, secret, callback) => {
          callback(new Error('Invalid token'));
        });

      authenticateJWT(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith(
        req.cookies.access_token,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        expect.any(Function)
      );
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Access token is no longer valid',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
