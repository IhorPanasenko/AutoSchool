const authController = require('../../controllers/authController.js');
const AppError = require('../../helpers/appError.js');
const UserLoginModel = require('../../models/userLogin.js');
const UserAccountModel = require('../../models/userAccount.js');
const { signSaveTokens } = require('../../authUtils/signSaveTokens.js');

jest.mock('../../models/userLogin.js');
jest.mock('../../models/userAccount.js');
jest.mock('../../authUtils/signSaveTokens.js');

describe('login', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('given no email and no password', () => {
    it('should return status 400', async () => {
      await authController.login(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      const errorInstance = next.mock.calls[0][0];
      expect(errorInstance.message).toBe('Provide email and password');
      expect(errorInstance.statusCode).toBe(400);
    });
  });

  describe('given email but no password', () => {
    it('should return status 400', async () => {
      req.body = { email: 'email@gmail.com' };
      await authController.login(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      const errorInstance = next.mock.calls[0][0];
      expect(errorInstance.message).toBe('Provide email and password');
      expect(errorInstance.statusCode).toBe(400);
    });
  });

  describe('given password but no email', () => {
    it('should return status 400', async () => {
      req.body = { password: 'password' };
      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      const errorInstance = next.mock.calls[0][0];
      expect(errorInstance.message).toBe('Provide email and password');
      expect(errorInstance.statusCode).toBe(400);
    });
  });

  describe('given valid email but incorrect password', () => {
    beforeEach(() => {
      req.body = { email: 'email@gmail.com', password: 'password' };
    });

    it('should return status 401 if user is not found', async () => {
      UserLoginModel.findOne.mockResolvedValue(undefined);
      await authController.login(req, res, next);

      expect(UserLoginModel.findOne).toHaveBeenCalledWith({
        email: req.body.email,
      });
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      const errorInstance = next.mock.calls[0][0];
      expect(errorInstance.message).toBe('Incorrect email or password');
      expect(errorInstance.statusCode).toBe(401);
    });

    it('should return status 401 if password verification fails', async () => {
      const mockUserLoginData = {
        email: 'email@gmail.com',
        passwordHash: 'hashed_password',
        verifyPassword: jest.fn().mockResolvedValue(false),
      };
      UserLoginModel.findOne.mockResolvedValue(mockUserLoginData);

      await authController.login(req, res, next);

      expect(UserLoginModel.findOne).toHaveBeenCalledWith({
        email: req.body.email,
      });
      expect(mockUserLoginData.verifyPassword).toHaveBeenCalledWith(
        req.body.password,
        mockUserLoginData.passwordHash
      );
      await expect(mockUserLoginData.verifyPassword()).resolves.toBe(false);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      const errorInstance = next.mock.calls[0][0];
      expect(errorInstance.message).toBe('Incorrect email or password');
      expect(errorInstance.statusCode).toBe(401);
    });
  });

  describe('given correct email and password', () => {
    beforeEach(() => {
      req.body = { email: 'email@gmail.com', password: 'password' };
    });

    it('should generate tokens', async () => {
      const mockUserAccountData = {
        _id: '1',
        role: 'user',
      };
      const mockTokens = {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expire: 'mock_expire',
      };
      const mockUserLoginData = {
        userId: '1',
        email: 'email@gmail.com',
        passwordHash: 'hashed_password',
        verifyPassword: jest.fn().mockResolvedValue(true),
        save: jest.fn(),
      };

      UserLoginModel.findOne.mockResolvedValue(mockUserLoginData);
      UserAccountModel.findById.mockResolvedValue(mockUserAccountData);
      signSaveTokens.mockImplementation(() => mockTokens);

      await authController.login(req, res, next);

      expect(UserLoginModel.findOne).toHaveBeenCalledWith({
        email: req.body.email,
      });
      expect(UserLoginModel.findOne).toBeTruthy();
      await expect(mockUserLoginData.verifyPassword()).resolves.toBe(true);
      expect(next).not.toHaveBeenCalled();
      expect(UserAccountModel.findById).toHaveBeenCalledWith(
        mockUserLoginData.userId
      );
      expect(signSaveTokens).toHaveBeenCalledWith(
        res,
        mockUserAccountData._id,
        mockUserAccountData.role
      );
      expect(signSaveTokens).toHaveReturnedWith(mockTokens);
      expect(mockUserLoginData.save).toHaveBeenCalled();
    });
  });
});
