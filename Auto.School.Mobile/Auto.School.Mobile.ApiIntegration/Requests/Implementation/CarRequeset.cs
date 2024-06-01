using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Helpers;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Base;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class CarRequeset(IPatchRequest patchRequest) : ICarRequest
    {
        private readonly IPatchRequest _patchRequest = patchRequest;
        public async Task<BaseResponse> AddRating(string carId, int rating)
        {
            var route = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.AddCarRating, carId);
            var res = await _patchRequest.ExecuteAsync<object, BaseResponse>(route, new { rating });
            return res;
        }
    }
}
