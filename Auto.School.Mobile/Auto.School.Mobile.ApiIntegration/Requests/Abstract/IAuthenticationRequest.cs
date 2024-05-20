using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Authentication;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Login;
using Auto.School.Mobile.Core.Responses.UpdatePassword;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IAuthenticationRequest
    {
        public Task<LoginResponse> Login(LoginModel loginModel);
        public Task<RegistrationResponse> Register(RegistrationModel registrationModel);
        public Task<BaseResponse> ForgotPassword(string email);
        public Task<BaseResponse> Logout(string userId);
        public Task<UpdatePasswordResponse>  UpdatePassword(string oldPassword,  string newPassword);
    }
}