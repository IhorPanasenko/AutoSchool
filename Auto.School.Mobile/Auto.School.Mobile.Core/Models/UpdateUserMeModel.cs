using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class UpdateUserMeModel
    {

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("surname")]
        public string Surname { get; set; }

        [JsonProperty("cityId")]
        public string CityId { get; set; }

        [JsonProperty("phone")]
        public string Phone { get; set; }

        [JsonProperty("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [JsonProperty("vehicleCategory")]
        public string VehicleCategory{ get; set; }
    }
}
