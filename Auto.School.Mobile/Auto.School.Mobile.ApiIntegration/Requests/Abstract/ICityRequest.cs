using Auto.School.Mobile.Core.Responses.City.GetAllCities;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface ICityRequest
    {
        public Task<AllCitiesResponse> GetAll();
    }
}
