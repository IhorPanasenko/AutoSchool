

using Auto.School.Mobile.ApiIntegration.Base;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.City.GetAllCities;

namespace Auto.School.Mobile.ApiIntegration.Requests
{
    public static class CityRequests
    {
        public static async Task<AllCitiesResponse> GetAll()
        {
            var cityResponse = await GetRequest.ExecuteAsync<AllCitiesResponse>(RoutesConstants.GetAllCities);

            if (cityResponse.Status is null)
            {
                cityResponse.Status = "failed";
                cityResponse.ResponseData = [];
            }

            return cityResponse;
        }
    }
}
