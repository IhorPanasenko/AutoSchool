using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Login
{
    public class LoginResponse : BaseResponse
    {
     
        [JsonProperty("data")]
        public LoginResponseData? LoginResponseData { get; set; }
    }
}
