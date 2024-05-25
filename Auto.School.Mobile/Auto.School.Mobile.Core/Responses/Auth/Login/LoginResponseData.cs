

using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Login
{
    public class LoginResponseData
    {
        [JsonProperty("email")]
        public required string Email { get; set; }

        [JsonProperty("userData")]
        public required UserDataModel UserData { get; set; }

        [JsonProperty("tokenExpire")]
        public required DateTime TokenExpirationTime { get; set; }
    }
}
