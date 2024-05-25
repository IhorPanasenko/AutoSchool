using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Helpers;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Lesson.SignUp;
using Auto.School.Mobile.Core.Responses.Lesson.StudentGetMy;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class LessonRequest(IPatchRequest patchRequest, IGetRequest getRequest) : ILessonRequest
    {
        private readonly IPatchRequest _patchRequest = patchRequest;
        private  readonly IGetRequest _getRequest = getRequest;

        public async Task<BaseResponse> CancelMyLesson(string lessonId)
        {
            var url = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.CancelMyLesson, lessonId);
            var res = await _patchRequest.ExecuteAsync<object, BaseResponse>(url);
            return res;
        }

        public async Task<SignUpToLessonResponse> SignUpToLesson(string lessonId)
        {
            var url = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.SignUpToLesson, lessonId);
            var res = await _patchRequest.ExecuteAsync<object, SignUpToLessonResponse>(url);
            return res;
        }

        public async Task<StudentGetMyLessonsResponse> StudentGetMyLessons()
        {
            var res = await _getRequest.ExecuteAsync<StudentGetMyLessonsResponse>(RoutesConstants.GetMyLessons);
            return res;
        }
    }
}
