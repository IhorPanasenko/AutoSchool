using Auto.School.Mobile.ApiIntegration.Base;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Authentication;
using Auto.School.Mobile.Core.Responses.Login;

namespace Auto.School.Mobile.ApiIntegration.Requests
{
    public static class AuthenticationRequests
    {
        public static async Task<LoginResponse> Login(LoginModel loginModel)
        {
            var result = await PostRequest.ExecuteAsync<LoginModel, LoginResponse>(RoutesConstants.Login, loginModel);

            if (result is null)
            {
                result = new LoginResponse() { 
                Message = "",
                Status = "Fail",
                };
            }

            return result;
        }

        public static async Task<RegistrationResponse> Register(RegistrationModel registrationModel)
        {
            var result = await PostRequest.ExecuteAsync<RegistrationModel, RegistrationResponse>(RoutesConstants.Register, registrationModel);

            if (result.Status is null)
            {
                result.Status = "failed";
            }

            return result;
        }
    }
}
