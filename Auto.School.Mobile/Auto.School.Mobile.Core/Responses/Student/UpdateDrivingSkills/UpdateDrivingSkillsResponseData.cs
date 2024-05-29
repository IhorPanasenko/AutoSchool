using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Student.UpdateDrivingSkills
{
    public class UpdateDrivingSkillsResponseData
    {
        [JsonProperty("_id")]
        public string? Id { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("surname")]
        public string? Surname { get; set; }

        [JsonProperty("userId")]
        public string? UserId { get; set; }

        [JsonProperty("cityId")]
        public string? CityId { get; set; }

        [JsonProperty("RequestStatus")]
        public string? RequestStatus { get; set; }

        [JsonProperty("vehicleCategory")]
        public string? VehicleCategory { get; set; }

        [JsonProperty("photoURL")]
        public string? PhotoUrl { get; set; }

        [JsonProperty("active")]
        public bool Active { get; set; }

        [JsonProperty("instructorId")]
        public string? InstructorId { get; set; }

        [JsonProperty("drivingSkills")]
        public List<DrivingSkillModel>? DrivingSkills { get; set; }

        [JsonProperty("drivingSkillsProgress")]
        public double DrivingSkillsProgress { get; set; }
    }
}
