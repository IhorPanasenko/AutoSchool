using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Base.Implementation;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Instructor;

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
                instructorsResponse.Status = "fail";
                instructorsResponse.Instructors = [];
            }

            return instructorsResponse;
        }
    }
}
