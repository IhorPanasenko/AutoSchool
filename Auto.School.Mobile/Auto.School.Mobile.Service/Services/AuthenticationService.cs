using Auto.School.Mobile.ApiIntegration.Requests;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Authentication;
using Auto.School.Mobile.Core.Responses.Login;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        public async Task<LoginResponse> LoginAsync(LoginModel loginModel)
        {
            var response = await AuthenticationRequests.Login(loginModel);
            return response;
        }

        public async Task<RegistrationResponse> RegisterAsync(RegistrationModel registrationModel)
        {
            var response = await AuthenticationRequests.Register(registrationModel);
            return response;
        }
    }
}
