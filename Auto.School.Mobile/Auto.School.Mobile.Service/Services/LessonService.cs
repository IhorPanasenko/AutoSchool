using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Lesson.SignUp;
using Auto.School.Mobile.Core.Responses.Lesson.StudentGetMy;
using Auto.School.Mobile.Service.Interfaces;


namespace Auto.School.Mobile.Service.Services
{
    public class LessonService(ILessonRequest lessonRequest) : ILessonService
    {
        private ILessonRequest _lessonRequest = lessonRequest;

        public async Task<BaseResponse> CancelMyLesson(string lessonId)
        {
            var res = await _lessonRequest.CancelMyLesson(lessonId);
            return res;
        }

        public async Task<int> GetNumberPassedLessons()
        {
            var res = await _lessonRequest.StudentGetMyLessons();
            if(string.Compare(res.Status, ResponseStatuses.Sucess, true) == 0)
            {
                var numberLessons = res.StudentLessons.Where(l => l.Date <= DateTime.Now).ToList().Count;
                return numberLessons;
            }

            return 0;
        }

        public async Task<BaseResponse> InstructorCancelLesson(string lessonId)
        {
            var res = await _lessonRequest.InstructorCancelLesson(lessonId);
            return res;
        }

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
