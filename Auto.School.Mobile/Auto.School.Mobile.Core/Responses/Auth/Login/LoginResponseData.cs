using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Auth.Login
{
    public class LoginResponseData
    {
        [JsonProperty("email")]
        public required string Email { get; set; }

        [JsonProperty("userData")]
        public required UserDataModel UserData { get; set; }

        [JsonProperty("instructor")]
        public string? InstructorId { get; set; }

        [JsonProperty("tokenExpire")]
        public required DateTime? TokenExpirationTime { get; set; }
    }
}
