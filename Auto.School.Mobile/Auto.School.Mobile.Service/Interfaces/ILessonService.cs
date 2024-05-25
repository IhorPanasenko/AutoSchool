using Auto.School.Mobile.Core.Responses.Lesson.SignUp;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface ILessonService
    {
        public Task<SignUpToLessonResponse> SignUpToLessonAsync(string lessonId);
    }
}
