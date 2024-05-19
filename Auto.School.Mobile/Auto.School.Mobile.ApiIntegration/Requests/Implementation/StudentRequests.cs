using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class StudentRequests(IPatchRequest patchRequest) : IStudentRequest
    {
        private readonly IPatchRequest _patchRequest = patchRequest;
        public async Task<ConnectWithInstructorResponse> ConnectWithInstructor(string instructorId)
        {
            try
            {
                var requestUrl = $"{RoutesConstants.StudentSignUpToInstructor}/{instructorId}";
                var response = await _patchRequest.ExecuteAsync<string, ConnectWithInstructorResponse>(
                    url: requestUrl);

                return response;
            }
            catch (Exception)
            {
                return new ConnectWithInstructorResponse
                {
                    Message = "Internal server error",
                    Status = "Fail",
                    Error = new Core.Responses.Base.BaseError()
                    {
                        Status = "Fail",
                        StatusCode = 500,
                        IsOperational = false
                    }
                };
            }
        }
    }
}
