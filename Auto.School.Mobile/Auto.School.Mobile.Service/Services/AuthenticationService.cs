using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Authentication;
using Auto.School.Mobile.Core.Responses.Login;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class AuthenticationService(IAuthenticationRequest authenticationRequest) : IAuthenticationService
    {
        private readonly IAuthenticationRequest _authenticationRequest = authenticationRequest;

        public async Task<LoginResponse> LoginAsync(LoginModel loginModel)
        {
            var response = await _authenticationRequest.Login(loginModel);
            return response;
        }

        public async Task<RegistrationResponse> RegisterAsync(RegistrationModel registrationModel)
        {
            var response = await _authenticationRequest.Register(registrationModel);
            return response;
        }
    }
}
