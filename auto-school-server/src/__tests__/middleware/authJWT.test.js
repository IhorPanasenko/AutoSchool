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
});
