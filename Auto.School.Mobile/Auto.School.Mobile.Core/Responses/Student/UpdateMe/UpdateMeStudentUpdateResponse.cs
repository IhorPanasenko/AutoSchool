using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Student.UpdateMe
{
    public class UpdateMeStudentUpdateResponse
    {
        [JsonProperty("_id")]
        public string? Id { get; set; }

        [JsonProperty("id")]
        public string? IdSecond { get; set; }

        [JsonIgnore]
        public string? Email { get; set; } = string.Empty;

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("surname")]
        public string? Surname { get; set; }

        [JsonProperty("requestStatus")]
        public string? RequestStatus { get; set; }

        [JsonProperty("vehicleCategory")]
        public string? VehicleCategory { get; set; }

        [JsonProperty("photoUrl")]
        public string? PhotoUrl { get; set; }

        [JsonProperty("active")]
        public bool? Active { get; set; }

        [JsonProperty("instructorId")]
        public string? InstructorId { get; set; }

        [JsonProperty("drivingSkillsProgress")]
        public double? DrivingSkillsProgress { get; set; }

        [JsonProperty("userId")]
        public string? UserData { get; set; }

        [JsonProperty("cityId")]
        public string? City { get; set; }

        [JsonProperty("drivingSkills")]
        public List<DrivingSkillModel>? DrivingSkills { get; set; } = new List<DrivingSkillModel>();

        [JsonIgnore]
        public string? FullName { get => $"{Name} {Surname}"; private set { } }
    }
}
