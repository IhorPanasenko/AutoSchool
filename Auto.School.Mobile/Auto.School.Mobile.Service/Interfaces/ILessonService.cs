using Auto.School.Mobile.Core.Responses.Lesson.SignUp;
using Auto.School.Mobile.Core.Responses.Lesson.StudentGetMy;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface ILessonService
    {
        public Task<SignUpToLessonResponse> SignUpToLessonAsync(string lessonId);

        public Task<StudentGetMyLessonsResponse> StudentGetMyLessonsAsync();
    }
}
