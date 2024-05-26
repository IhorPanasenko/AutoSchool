using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Base.Implementation;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Auth.Login;
using Auto.School.Mobile.Core.Responses.Auth.RefreshToken;
using Auto.School.Mobile.Core.Responses.Auth.Registration;
using Auto.School.Mobile.Core.Responses.Auth.UpdatePassword;
using Auto.School.Mobile.Core.Responses.Base;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class AuthenticationRequests(IPostRequest postRequest, IPatchRequest patchRequest, IDeleteRequest deleteRequest, ITokenExpirationService tokenExpirationServcie) : IAuthenticationRequest
    {
        private readonly IPostRequest _postRequest = postRequest;
        private readonly IPatchRequest _patchRequest = patchRequest;
        private readonly IDeleteRequest _deleteRequest = deleteRequest;
        private readonly ITokenExpirationService _tokenExpirationService = tokenExpirationServcie;

        public async Task<BaseResponse> ForgotPassword(string email)
        {
            var result = await _postRequest.ExecuteAsync<object, BaseResponse>(RoutesConstants.ForgotPassword, new { email = email });
            return result;
        }

        public async Task<LoginResponse> Login(LoginModel loginModel)
        {
            var result = await _postRequest.ExecuteAsync<LoginModel, LoginResponse>(RoutesConstants.Login, loginModel);

            var expireTime = result.LoginResponseData?.TokenExpirationTime;
            if (expireTime is not null)
            {
                _tokenExpirationService.SaveTokenExpiration(expireTime);
            }

            return result;
        }

        public async Task<BaseResponse> Logout()
        {
            var result = await _deleteRequest.ExecuteAsync<BaseResponse>(RoutesConstants.Logout);
            _tokenExpirationService.RemoveExpirationTime();
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
