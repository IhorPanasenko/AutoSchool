using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class RegistrationModel
    {
        [JsonProperty("name")]
        public required string FirstName { get; set; }

        [JsonProperty("surname")]
        public required string LastName { get; set; }

        [JsonProperty("email")]
        public required string Email { get; set; }

        [JsonProperty("password")]
        public required string Password { get; set; }

        [JsonProperty("phone")]
        public required string Phone { get; set; }

        [JsonProperty("dateOfBirth")]
        public required DateTime DateOfBirth {  get; set; }

        [JsonProperty("cityId")]
        public required string CityId { get; set; }

        [JsonProperty("vehicleCategory")]
        public required string VehicleCategory { get; set; }
    }
}
