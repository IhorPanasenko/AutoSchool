using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Student.GetInfoMe
{
    public class GetInfoMeResponseData
    {
        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("student")]
        public StudentModel Student { get; set; }
    }
}
