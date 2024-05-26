using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Responses.Auth.RefreshToken;

namespace Auto.School.Mobile.ApiIntegration.Servicecs.Implementation
{
    public class TokenExpirationService(IPostRequest postRequest) : ITokenExpirationService
    {
        private DateTime? _tokenExpiration;
        private readonly IPostRequest _postRequest = postRequest;

        public async void TryRefreshToken()
        {
            if ((!_tokenExpiration.HasValue )|| (_tokenExpiration.HasValue && _tokenExpiration.Value <= DateTime.Now))
            {   
                var res = await _postRequest.ExecuteAsync<object, RefreshTokenResponse>(RoutesConstants.TokenRefresh, null);
                if(string.Compare(res.Status, ResponseStatuses.Sucess, true) == 0)
                {
                    _tokenExpiration = res.TokenExpire;
                }
            }

        }
    }
}
