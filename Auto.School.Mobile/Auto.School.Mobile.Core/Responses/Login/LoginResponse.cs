using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Login
{
    public class LoginResponse : BaseResponse
    {
        public LoginResponse(string status)
        {
            Status = status;
        }

        public LoginResponse()
        {
            
        }

        [JsonProperty("data")]
        public LoginResponseData? LoginResponseData { get; set; }
    }
}
