const { restrictTo } = require('../../middlewares/restrictTo.js');
const AppError = require('../../helpers/appError.js');

describe('restrictTo', () => {
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  describe('given permitted roles', () => {
    it('it should allow access', () => {
      const req = {
        user: { role: 'admin' },
      };

      const middleware = restrictTo('admin');
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('given non-permitted roles', () => {
    it('it should restrict access', () => {
      const req = {
        user: { role: 'student' },
      };

      const middleware = restrictTo('admin');
      middleware(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(AppError));
      const errorInstance = next.mock.calls[0][0];
      expect(errorInstance.message).toBe(
        'You have no permission to perform this action'
      );
      expect(errorInstance.statusCode).toBe(403);
    });
  });
});
