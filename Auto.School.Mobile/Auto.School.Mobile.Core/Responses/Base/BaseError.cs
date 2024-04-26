using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Base
{
    public class BaseError
    {
        [JsonProperty("statusCode")]
        public int StatusCode { get; set; }

        [JsonProperty("status")]
        public string? Status { get; set; }

        [JsonProperty("isOperational")]
        public bool IsOperational { get; set; }

    }
}
