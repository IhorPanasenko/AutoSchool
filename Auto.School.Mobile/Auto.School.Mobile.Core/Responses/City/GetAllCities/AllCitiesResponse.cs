using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.City.GetAllCities
{
    public class AllCitiesResponse : BaseResponse
    {
        [JsonProperty("data")]
        public List<CityModel> ResponseData { get; set; } = [];
    }
}
