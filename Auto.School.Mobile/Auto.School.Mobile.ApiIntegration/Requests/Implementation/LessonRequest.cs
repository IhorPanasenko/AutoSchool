using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Helpers;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Lesson.SignUp;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class LessonRequest(IPatchRequest patchRequest) : ILessonRequest
    {
        private readonly IPatchRequest _patchRequest = patchRequest;
        public async Task<SignUpToLessonResponse> SignUpToLesson(string lessonId)
        {
            var url = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.SignUpToLesson, lessonId);
            var res = await _patchRequest.ExecuteAsync<object, SignUpToLessonResponse>(url);
            return res;
        }
    }
}
