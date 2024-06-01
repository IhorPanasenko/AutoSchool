using Auto.School.Mobile.Core.Responses.Base;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface ICarService
    {
        public Task<BaseResponse> AddRating(string carId, int rating);
    }
}
