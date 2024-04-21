
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.City.GetAllCities;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface ICityService
    {
        public Task<AllCitiesResponse> GetAll();
    }
}
