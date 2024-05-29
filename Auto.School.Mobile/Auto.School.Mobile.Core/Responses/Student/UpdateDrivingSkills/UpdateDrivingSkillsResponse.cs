using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Student.UpdateDrivingSkills
{
    public class UpdateDrivingSkillsResponse : BaseResponse
    {
        [JsonProperty("data")]
        public UpdateDrivingSkillsResponseData Data;
    }
}
