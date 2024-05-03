using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.City.GetAllCities;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class CityRequests(IGetRequest getRequest) : ICityRequest
    {
        private readonly IGetRequest _getRequest = getRequest;
        public async Task<AllCitiesResponse> GetAll()
        {
            var cityResponse = await _getRequest.ExecuteAsync<AllCitiesResponse>(RoutesConstants.GetAllCities);

            if (cityResponse.Status is null)
            {
                cityResponse.Status = "failed";
                cityResponse.ResponseData = [];
            }

            return cityResponse;
        }
    }
}
