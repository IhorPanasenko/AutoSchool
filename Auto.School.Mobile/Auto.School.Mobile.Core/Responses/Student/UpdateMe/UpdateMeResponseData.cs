using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Student.UpdateMe
{
    public class UpdateMeResponseData
    {
        [JsonProperty("updatedStudent")]
        public UpdateMeStudentUpdateResponse? Student { get; set; }

        [JsonProperty("updatedUser")]
        public UserDataModel? User { get; set; }
    }
}
