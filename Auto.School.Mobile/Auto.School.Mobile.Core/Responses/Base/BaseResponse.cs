using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Base
{
    public class BaseResponse
    {
        [JsonProperty("status")]
        public string? Status { get; set; }

        [JsonProperty("message")]
        public string? Message { get; set; }

        [JsonProperty("error")]
        public BaseError? Error { get; set; }

        [JsonProperty("stack")]
        public string? ErrorCallstack { get; set; }
    }
}
