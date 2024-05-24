using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Helpers;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Responses.Instructor;
using Auto.School.Mobile.Core.Responses.Instructor.GetOne;
using Auto.School.Mobile.Core.Responses.Instructor.GetSchedule;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class InstructorRequests(IGetRequest getRequest) : IInstructorRequest
    {
        private readonly IGetRequest _getRequest = getRequest;

        public async Task<GetAllInstructorsResponse> GetAll()
        {
            var instructorsResponse = await _getRequest.ExecuteAsync<GetAllInstructorsResponse>(RoutesConstants.GetAllInstructors);

            if (instructorsResponse.Status is null)
            {
                instructorsResponse.Status = ResponseStatuses.Fail;
                instructorsResponse.Instructors = [];
            }

            return instructorsResponse;
        }

        public async Task<GetOneInstructorResponse> GetOne(string id)
        {
            var response = await _getRequest.ExecuteAsync<GetOneInstructorResponse>($"{RoutesConstants.GetOneInstructor}{id}");
            return response;
        }

        public async Task<GetScheduleResponse> GetSchedule(string id)
        {
            var url = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.GetSchedule, id);
            var response = await _getRequest.ExecuteAsync<GetScheduleResponse>(url);
            return response;
        }
    }
}
