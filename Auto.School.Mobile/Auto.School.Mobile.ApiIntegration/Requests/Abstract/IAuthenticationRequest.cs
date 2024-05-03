using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Authentication;
using Auto.School.Mobile.Core.Responses.Login;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IAuthenticationRequest
    {
        public Task<LoginResponse> Login(LoginModel loginModel);
        public Task<RegistrationResponse> Register(RegistrationModel registrationModel);
    }
}