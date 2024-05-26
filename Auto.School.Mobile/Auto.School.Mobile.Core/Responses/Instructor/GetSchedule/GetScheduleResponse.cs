using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Instructor.GetSchedule
{
    public class GetScheduleResponse : BaseResponse
    {
        [JsonProperty("data")]
        public List<LessonModel> Lessons { get; set; }
    }
}
