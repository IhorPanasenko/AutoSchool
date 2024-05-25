using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Lesson.SignUp;
using Auto.School.Mobile.Core.Responses.Lesson.StudentGetMy;
using Auto.School.Mobile.Service.Interfaces;


namespace Auto.School.Mobile.Service.Services
{
    public class LessonService(ILessonRequest lessonRequest) : ILessonService
    {
        private ILessonRequest _lessonRequest = lessonRequest;
        public async Task<SignUpToLessonResponse> SignUpToLessonAsync(string lessonId)
        {
            var res = await _lessonRequest.SignUpToLesson(lessonId);
            return res;
        }

        public async Task<StudentGetMyLessonsResponse> StudentGetMyLessonsAsync()
        {
            var res = await _lessonRequest.StudentGetMyLessons();
            return res;
        }
    }
}
