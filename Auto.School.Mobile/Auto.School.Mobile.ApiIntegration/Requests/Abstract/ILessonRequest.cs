using Auto.School.Mobile.Core.Responses.Lesson.SignUp;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface ILessonRequest
    {
        public Task<SignUpToLessonResponse> SignUpToLesson(string lessonId);
    }
}
