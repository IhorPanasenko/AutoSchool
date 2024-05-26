using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Auth.Login
{
    public class LoginResponse : BaseResponse
    {

        [JsonProperty("data")]
        public LoginResponseData? LoginResponseData { get; set; }
    }
}
