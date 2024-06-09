const { restrictTo } = require('../../middlewares/restrictTo.js');
const AppError = require('../../helpers/appError.js');

const res = {};
const next = jest.fn();

describe('restrictTo', () => {
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
});
