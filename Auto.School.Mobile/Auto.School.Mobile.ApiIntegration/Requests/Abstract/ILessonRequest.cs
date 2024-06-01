using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Lesson.SignUp;
using Auto.School.Mobile.Core.Responses.Lesson.StudentGetMy;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface ILessonRequest
    {
        public Task<SignUpToLessonResponse> SignUpToLesson(string lessonId);

        public Task<StudentGetMyLessonsResponse> StudentGetMyLessons();

        public Task<BaseResponse> CancelMyLesson(string lessonId);

        public Task<BaseResponse> InstructorCancelLesson(string lessonId);
    }
}
