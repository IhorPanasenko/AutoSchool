using Auto.School.Mobile.ApiIntegration.Base;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.Core.Responses.Instructor;

namespace Auto.School.Mobile.ApiIntegration.Requests
{
    public static class InstructorRequests
    {
        public static async Task<GetAllInstructorsResponse> GetAll()
        {
            var instructorsResponse = await GetRequest.ExecuteAsync<GetAllInstructorsResponse>(RoutesConstants.GetAllInstructors);

            if (instructorsResponse.Status is null)
            {
                instructorsResponse.Status = "fail";
                instructorsResponse.Instructors = [];
            }

            return instructorsResponse;
        }
    }
}
