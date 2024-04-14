using Auto.School.Mobile.ApiIntegration.Base;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Login;

namespace Auto.School.Mobile.ApiIntegration.Requests
{
    public static class AuthenticationRequests
    {
        public static async Task<LoginResponse> Login(LoginModel loginModel)
        {
            var result = await PostRequest.ExecuteAsync<LoginModel, LoginResponse>(RoutesConstants.LoginRoute, loginModel);

            if (result.Status is null && result.LoginResponseData is null)
            {
                result.Status = "failed";
            }

            return result;
        }
    }
}
