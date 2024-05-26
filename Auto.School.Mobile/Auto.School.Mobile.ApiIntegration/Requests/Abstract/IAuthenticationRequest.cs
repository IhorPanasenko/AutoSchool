using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Auth.Login;
using Auto.School.Mobile.Core.Responses.Auth.RefreshToken;
using Auto.School.Mobile.Core.Responses.Auth.Registration;
using Auto.School.Mobile.Core.Responses.Auth.UpdatePassword;
using Auto.School.Mobile.Core.Responses.Base;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IAuthenticationRequest
    {
        public Task<LoginResponse> Login(LoginModel loginModel);
        public Task<RegistrationResponse> Register(RegistrationModel registrationModel);
        public Task<BaseResponse> ForgotPassword(string email);
        public Task<BaseResponse> Logout();
        public Task<UpdatePasswordResponse>  UpdatePassword(string oldPassword,  string newPassword);
    }
}