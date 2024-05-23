using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class StudentModel
    {
        [JsonProperty("_id")]
        public string Id { get; set; }

        [JsonIgnore]
        public string Email { get; set; } = string.Empty;

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("surname")]
        public string Surname { get; set; }

        [JsonProperty("requestStatus")]
        public string RequestStatus { get; set; }

        [JsonProperty("vehicleCategory")]
        public string VehicleCategory { get; set; }

        [JsonProperty("photoUrl")]
        public  string PhotoUrl { get; set; }

        [JsonProperty("active")]
        public bool Actice { get; set; }

        [JsonProperty("instructorId")]
        public string InstructorId { get; set; }

        [JsonProperty("userId")]
        public UserDataModel UserData { get; set; }

        [JsonProperty("cityId")]
        public CityModel City { get; set; }
    }
}
