using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Lesson.SignUp;
using Auto.School.Mobile.Core.Responses.Lesson.StudentGetMy;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface ILessonService
    {
        public Task<SignUpToLessonResponse> SignUpToLessonAsync(string lessonId);

        public Task<StudentGetMyLessonsResponse> StudentGetMyLessonsAsync();

        public Task<BaseResponse> CancelMyLesson(string lessonId);

        public Task<int> GetNumberPassedLessons();

        public Task<BaseResponse> InstructorCancelLesson(string lessonId);

    }
}
