using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses
{
    public class BaseResponse
    {
        [JsonProperty("status")]
        public string? Status { get; set; }

        [JsonProperty("message")]
        public string? Message { get; set; } 
    }
}
