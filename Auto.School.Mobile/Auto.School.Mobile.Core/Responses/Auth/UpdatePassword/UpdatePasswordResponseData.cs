using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Auth.UpdatePassword
{
    public class UpdatePasswordResponseData
    {
        [JsonProperty("tokenExpire")]
        public DateTime TokenExpire { get; set; }

        [JsonProperty("accessToken")]
        public string AccessToken { get; set; }

        [JsonProperty("refreshToken")]
        public string RefreshToken { get; set; }
    }
}
