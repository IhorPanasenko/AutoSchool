using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class CarService(ICarRequest carRequest) : ICarService
    {
        private readonly ICarRequest _carRequest = carRequest;
        public async Task<BaseResponse> AddRating(string carId, int rating)
        {
            var res = await _carRequest.AddRating(carId, rating);
            return res;
        }
    }
}
