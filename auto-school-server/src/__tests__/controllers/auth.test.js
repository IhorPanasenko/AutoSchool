const authController = require('../../controllers/authController.js');
const AppError = require('../../helpers/appError.js');
const UserLogin = require('../../models/userLogin.js');

jest.mock('../../models/userLogin.js');

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
      expect(next).toHaveBeenCalledWith(
        new AppError('Provide email and password', 400)
      );
    });
  });

  describe('given email but no password', () => {
    it('should return status 400', async () => {
      req.body = { email: 'email@gmail.com' };
      await authController.login(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new AppError('Provide email and password', 400)
      );
    });
  });

  describe('given password but no email', () => {
    it('should return status 400', async () => {
      req.body = { password: 'password' };
      await authController.login(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new AppError('Provide email and password', 400)
      );
    });
  });

  describe('given valid email but incorrect password', () => {
    beforeEach(() => {
      req.body = { email: 'email@gmail.com', password: 'password' };
    });

    it('should return status 401 if user is not found', async () => {
      UserLogin.findOne.mockResolvedValue(undefined);
      await authController.login(req, res, next);

      expect(UserLogin.findOne).toHaveBeenCalledWith({
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
      UserLogin.findOne.mockResolvedValue(mockUserLoginData);

      await authController.login(req, res, next);

      expect(UserLogin.findOne).toHaveBeenCalledWith({ email: req.body.email });
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
});
