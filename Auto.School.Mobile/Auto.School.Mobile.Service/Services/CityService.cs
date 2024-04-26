using Auto.School.Mobile.ApiIntegration.Requests;
using Auto.School.Mobile.Core.Responses.City.GetAllCities;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class CityService : ICityService
    {
        public async Task<AllCitiesResponse> GetAll()
        {
            var response = await CityRequests.GetAll();

            if (response.ResponseData is null)
            {
                response.Status = "Failed";
                response.Message = "";
            }

            return response;
        }
    }
}
