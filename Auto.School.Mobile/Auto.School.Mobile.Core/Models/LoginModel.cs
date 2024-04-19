using Newtonsoft.Json;


namespace Auto.School.Mobile.Core.Models
{
    public class LoginModel
    {
        [JsonProperty("email")]
        public required string Email { get; set; }

        [JsonProperty("password")]
        public required string Password { get; set; }
    }
}
