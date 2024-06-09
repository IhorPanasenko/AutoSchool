require('dotenv').config();
const jwt = require('jsonwebtoken');
const { authenticateJWT } = require('../../middlewares/authenticateJWT.js');
const UserAccountModel = require('../../models/userAccount.js');
const UserLoginModel = require('../../models/userLogin.js');

describe('authenticateJWT', () => {
  let res, next;
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

      jwt.verify = jest.fn().mockImplementationOnce(() => {
        throw new Error('Invalid token');
      });

      authenticateJWT(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith(
        req.cookies.access_token,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Access token is no longer valid',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('given valid access token', () => {
    it('should attach user to req', async () => {
      const userId = 'user123';
      const accessToken = jwt.sign(
        { userId },
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      req.cookies.access_token = accessToken;
      jwt.verify = jest.fn().mockImplementationOnce(() => ({ userId }));

      const mockCurrentUser = { _id: userId, role: 'student' };
      const mockCurrentUserLoginData = {
        passwordChangedAfter: jest.fn(() => false),
      };
      jest
        .spyOn(UserAccountModel, 'findById')
        .mockResolvedValueOnce(mockCurrentUser);
      jest
        .spyOn(UserLoginModel, 'findOne')
        .mockResolvedValueOnce(mockCurrentUserLoginData);

      await authenticateJWT(req, res, next);

      expect(UserAccountModel.findById).toHaveBeenCalledWith(userId);
      expect(UserLoginModel.findOne).toHaveBeenCalledWith({ userId });
      expect(req.user).toEqual(mockCurrentUser);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    it('should return status 401 if password was changed', async () => {
      const userId = 'user123';
      const iat = 'some_date';
      const accessToken = jwt.sign(
        { userId },
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      req.cookies.access_token = accessToken;
      jwt.verify = jest.fn().mockImplementationOnce(() => ({ userId, iat }));

      const mockCurrentUser = { _id: userId, role: 'student' };
      const mockCurrentUserLoginData = {
        passwordChangedAfter: jest.fn(() => true),
      };
      jest
        .spyOn(UserAccountModel, 'findById')
        .mockResolvedValueOnce(mockCurrentUser);
      jest
        .spyOn(UserLoginModel, 'findOne')
        .mockResolvedValueOnce(mockCurrentUserLoginData);

      await authenticateJWT(req, res, next);

      expect(UserAccountModel.findById).toHaveBeenCalledWith(userId);
      expect(UserLoginModel.findOne).toHaveBeenCalledWith({ userId });
      expect(
        mockCurrentUserLoginData.passwordChangedAfter
      ).toHaveBeenCalledWith(iat);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Password was changed. Please, log in again',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
