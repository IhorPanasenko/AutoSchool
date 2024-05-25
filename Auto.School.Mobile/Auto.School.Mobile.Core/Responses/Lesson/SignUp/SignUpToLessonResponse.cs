using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Lesson.SignUp
{
    public class SignUpToLessonResponse : BaseResponse
    {
        [JsonProperty("data")]
        public LessonModel UpdatedLesson { get; set; }
    }
}
