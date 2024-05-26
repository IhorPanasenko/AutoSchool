﻿using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Base.Implementation;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Authentication;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Login;
using Auto.School.Mobile.Core.Responses.UpdatePassword;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class AuthenticationRequests(IPostRequest postRequest, IPatchRequest patchRequest, IDeleteRequest deleteRequest) : IAuthenticationRequest
    {
        private readonly IPostRequest _postRequest = postRequest;
        private readonly IPatchRequest _patchRequest = patchRequest;
        private readonly IDeleteRequest _deleteRequest = deleteRequest;

        public async Task<BaseResponse> ForgotPassword(string email)
        {
            var result = await _postRequest.ExecuteAsync<object, BaseResponse>(RoutesConstants.ForgotPassword, new { email = email });
            return result;
        }

        public async Task<LoginResponse> Login(LoginModel loginModel)
        {
            var result = await _postRequest.ExecuteAsync<LoginModel, LoginResponse>(RoutesConstants.Login, loginModel);

            if (result is null)
            {
                result = new LoginResponse()
                {
                    Message = "",
                    Status = "Fail",
                };
            }

            return result;
        }

        public async Task<BaseResponse> Logout()
        {
            var result = await _deleteRequest.ExecuteAsync<BaseResponse>(RoutesConstants.Logout);
            return result;
        }

        public async Task<RegistrationResponse> Register(RegistrationModel registrationModel)
        {
            var result = await _postRequest.ExecuteAsync<RegistrationModel, RegistrationResponse>(RoutesConstants.Register, registrationModel);

            if (result.Status is null)
            {
                result.Status = "failed";
            }

            return result;
        }

        public async Task<UpdatePasswordResponse> UpdatePassword(string oldPassword, string newPassword)
        {
            var result = await _patchRequest.ExecuteAsync<object, UpdatePasswordResponse>(RoutesConstants.UpdatePassword, new { currentPassword = oldPassword, newPassword = newPassword });
            return result;
        }
    }
}
