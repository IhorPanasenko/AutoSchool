using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class UpdateDrivingSkillsModel
    {
        [JsonProperty("drivingSkills")]
        public List<DrivingSkillModel>? DrivingSkills { get; set; }
    }
}
