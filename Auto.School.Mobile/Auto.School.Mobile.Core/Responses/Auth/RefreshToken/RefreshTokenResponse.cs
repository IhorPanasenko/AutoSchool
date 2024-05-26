using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Auth.RefreshToken
{
    public class RefreshTokenResponse : BaseResponse
    {
        [JsonProperty("tokenExpire")]
        public DateTime TokenExpire { get; set; }
    }
}
