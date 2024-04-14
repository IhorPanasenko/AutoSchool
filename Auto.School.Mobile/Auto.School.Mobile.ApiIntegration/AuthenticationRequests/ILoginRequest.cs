using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Login;

namespace Auto.School.Mobile.ApiIntegration.AuthenticationRequests
{
    public interface ILoginRequest
    {
        public Task<LoginResponse> Execute(LoginModel loginModel);
    }
}
