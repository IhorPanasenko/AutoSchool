using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class UserDataModel
    {
        [JsonProperty("_id")]
        public string Id { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("surname")]
        public string? Surname { get; set; }

        [JsonProperty("phone")]
        public string? Phone { get; set; }

        [JsonProperty("role")]
        public string? Role { get; set; }

        [JsonProperty("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }
    }
}
