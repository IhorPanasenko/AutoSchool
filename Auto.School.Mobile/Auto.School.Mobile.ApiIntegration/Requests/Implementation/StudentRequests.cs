using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Student.ConnectWithInstructor;
using Auto.School.Mobile.Core.Responses.Student.GetInfoMe;
using Auto.School.Mobile.Core.Responses.Student.UpdateMe;
using System.IO;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class StudentRequests(IPatchRequest patchRequest, IGetRequest getRequest, ITokenExpirationService tokenExpirationService) : IStudentRequest
    {
        private readonly IPatchRequest _patchRequest = patchRequest;
        private readonly IGetRequest _getRequest = getRequest;
        private readonly ITokenExpirationService _tokenExpirationService;
        public async Task<ConnectWithInstructorResponse> ConnectWithInstructor(string instructorId)
        {
            try
            {
                _tokenExpirationService.TryRefreshToken();
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
                _tokenExpirationService.TryRefreshToken();
                var response = await _getRequest.ExecuteAsync<GetInfoMeResponse>(RoutesConstants.GetInfoMe);
                if (string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
                {
                    response.Data.Student.Email = response.Data.Email;
                }
                return response;
            }
            catch(Exception ex) { 
                return new GetInfoMeResponse 
                { 
                    Message = ex.Message,
                    Status = ResponseStatuses.Fail,
                    Error = new BaseError()
                    {
                        Status = "Fail",
                        StatusCode = 500,
                        IsOperational = false
                    }
                };

            }
        }

        public async Task<UpdateMeResponse> UpdateMe(UpdateUserMeModel updateMeModel)
        {
            try
            {
                _tokenExpirationService.TryRefreshToken();
                var response = await _patchRequest.ExecuteAsync<UpdateUserMeModel, UpdateMeResponse>(RoutesConstants.UpdateMe, updateMeModel);
                return response;
            }
            catch (Exception ex)
            {
                return new UpdateMeResponse
                {
                    Data = null,
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
                _tokenExpirationService.TryRefreshToken();
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
