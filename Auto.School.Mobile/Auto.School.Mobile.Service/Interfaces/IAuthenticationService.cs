using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Authentication;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Login;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface IAuthenticationService
    {
        public Task<LoginResponse> LoginAsync(LoginModel loginModel);

        public Task<RegistrationResponse> RegisterAsync(RegistrationModel registrationModel);

        public Task<BaseResponse> ForgotPassword(string email);

        public Task<BaseResponse> Logout(string userId);
    }
}
