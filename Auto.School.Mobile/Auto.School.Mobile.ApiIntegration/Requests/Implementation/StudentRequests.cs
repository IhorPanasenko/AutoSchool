using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;
using Auto.School.Mobile.Core.Responses.Student.GetInfoMe;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class StudentRequests(IPatchRequest patchRequest, IGetRequest getRequest) : IStudentRequest
    {
        private readonly IPatchRequest _patchRequest = patchRequest;
        private readonly IGetRequest _getRequest = getRequest;
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

        public async Task<GetInfoMeResponse> GetInfoMe()
        {
            try
            {
                var response = await _getRequest.ExecuteAsync<GetInfoMeResponse>(RoutesConstants.GetInfoMe);
                return response;
            }
            catch(Exception ex) { 
                return new GetInfoMeResponse 
                { 
                    Message = ex.Message,
                    Status = ResponseStatuses.Fail,
                    Error = new Core.Responses.Base.BaseError()
                    {
                        Status = "Fail",
                        StatusCode = 500,
                        IsOperational = false
                    }
                };

            }
        }

        public async Task<BaseResponse> UpdateProfileImage(Stream stream)
        {
            try
            {
                var response = await _patchRequest.UploadImageAsync<BaseResponse>(RoutesConstants.UpdatePhoto, stream, "profileAvatar");
                return response;
            }
            catch (Exception ex)
            {
                return new BaseResponse
                {
                    Message = ex.Message,
                    Status = ResponseStatuses.Fail,
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
