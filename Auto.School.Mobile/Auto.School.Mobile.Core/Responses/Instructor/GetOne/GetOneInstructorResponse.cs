using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Instructor.GetOne
{
    public class GetOneInstructorResponse : BaseResponse
    {
        [JsonProperty("data")]
        public InstructorModel Instructor { get; set; }
    }
}
