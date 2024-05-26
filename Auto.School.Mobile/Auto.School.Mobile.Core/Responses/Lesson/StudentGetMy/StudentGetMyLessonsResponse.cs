using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Lesson.StudentGetMy
{
    public class StudentGetMyLessonsResponse : BaseResponse
    {
        [JsonProperty("data")]
        public List<StudentLessonModel> StudentLessons { get; set; }
    }
}
