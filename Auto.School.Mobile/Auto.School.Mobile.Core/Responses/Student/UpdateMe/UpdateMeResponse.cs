using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Student.UpdateMe
{
    public class UpdateMeResponse : BaseResponse
    {
        [JsonProperty("data")]
        public StudentModel? Student { get; set; }
    }
}
