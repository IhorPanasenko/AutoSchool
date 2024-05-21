using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Authentication;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Login;
using Auto.School.Mobile.Core.Responses.UpdatePassword;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class AuthenticationService(IAuthenticationRequest authenticationRequest) : IAuthenticationService
    {
        private readonly IAuthenticationRequest _authenticationRequest = authenticationRequest;

        public async Task<BaseResponse> ForgotPassword(string email)
        {
            var response = await _authenticationRequest.ForgotPassword(email);
            return response;
        }

        public async Task<LoginResponse> LoginAsync(LoginModel loginModel)
        {
            var response = await _authenticationRequest.Login(loginModel);
            return response;
        }

        public async Task<BaseResponse> Logout(string userId)
        {
            var response = await _authenticationRequest.Logout(userId);
            return response;
        }

        public async Task<RegistrationResponse> RegisterAsync(RegistrationModel registrationModel)
        {
            var response = await _authenticationRequest.Register(registrationModel);
            return response;
        }

        public async Task<UpdatePasswordResponse> UpdatePassword(string oldPassword, string newPassword)
        {
            var response = await _authenticationRequest.UpdatePassword(oldPassword, newPassword);
            return response;
        }
    }
}
