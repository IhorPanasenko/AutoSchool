using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class UserDataModel
    {
        [JsonProperty("_id")]
        public required string Id { get; set; }

        [JsonProperty("name")]
        public required string Name { get; set; }

        [JsonProperty("surname")]
        public required string Surname { get; set; }

        [JsonProperty("phone")]
        public required string Phone { get; set; }

        [JsonProperty("role")]
        public required string Role { get; set; }

        [JsonProperty("dateOfBirth")]
        public required string DateOfBirth { get; set; }
    }
}
