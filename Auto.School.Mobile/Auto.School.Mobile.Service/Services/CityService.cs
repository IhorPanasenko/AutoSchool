using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.City.GetAllCities;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class CityService(ICityRequest cityRequest) : ICityService
    {
        private readonly ICityRequest _cityRequest = cityRequest;

        public async Task<AllCitiesResponse> GetAll()
        {
            var response = await _cityRequest.GetAll();

            if (response.ResponseData is null)
            {
                response.Status = "Failed";
                response.Message = "";
            }

            return response;
        }
    }
}
