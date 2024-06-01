using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Auth.Login;
using Auto.School.Mobile.Core.Responses.Auth.Registration;
using Auto.School.Mobile.Core.Responses.Auth.UpdatePassword;
using Auto.School.Mobile.Core.Responses.Base;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface IAuthenticationService
    {
        public Task<LoginResponse> LoginAsync(LoginModel loginModel);

        public Task<RegistrationResponse> RegisterAsync(RegistrationModel registrationModel);

        public Task<BaseResponse> ForgotPassword(string email);

        public Task<BaseResponse> Logout();

        public Task<UpdatePasswordResponse> UpdatePassword(string oldPassword, string newPassword);
    }
}
