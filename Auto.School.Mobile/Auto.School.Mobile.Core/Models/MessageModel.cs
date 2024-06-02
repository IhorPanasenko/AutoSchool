using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class MessageModel
    {
        [JsonProperty("recipientId")]
        public string? RecipientId { get; set; }

        [JsonProperty("senderId")]
        public string? SenderId { get; set; }

        [JsonProperty("type")]
        public string? Type { get; set; }

        [JsonProperty("text")]
        public string? Message { get; set; }
    }
}
