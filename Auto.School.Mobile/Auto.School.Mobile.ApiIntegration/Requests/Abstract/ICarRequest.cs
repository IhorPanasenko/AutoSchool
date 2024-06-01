using Auto.School.Mobile.Core.Responses.Base;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface ICarRequest
    {
        public Task<BaseResponse> AddRating(string carId, int rating);
    }
}
