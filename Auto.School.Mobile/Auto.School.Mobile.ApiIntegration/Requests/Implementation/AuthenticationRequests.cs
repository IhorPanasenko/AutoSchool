using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Authentication;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Login;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class AuthenticationRequests(IPostRequest postRequest) : IAuthenticationRequest
    {
        private readonly IPostRequest _postRequest = postRequest;

        public async Task<BaseResponse> ForgotPassword(string email)
        {
            var result = await _postRequest.ExecuteAsync<object, BaseResponse>(RoutesConstants.ForgotPassword, new { email = email });
            return result;
        }

        public async Task<LoginResponse> Login(LoginModel loginModel)
        {
            var result = await _postRequest.ExecuteAsync<LoginModel, LoginResponse>(RoutesConstants.Login, loginModel);

            if (result is null)
            {
                result = new LoginResponse()
                {
                    Message = "",
                    Status = "Fail",
                };
            }

            return result;
        }

        public async Task<RegistrationResponse> Register(RegistrationModel registrationModel)
        {
            var result = await _postRequest.ExecuteAsync<RegistrationModel, RegistrationResponse>(RoutesConstants.Register, registrationModel);

            if (result.Status is null)
            {
                result.Status = "failed";
            }

            return result;
        }
    }
}
