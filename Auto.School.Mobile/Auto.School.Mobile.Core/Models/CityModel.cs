
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class CityModel
    {
        [JsonProperty("_id")]
        public required string Id { get; set; }

        [JsonProperty("name")]
        public required string Name { get; set; }
    }
}
