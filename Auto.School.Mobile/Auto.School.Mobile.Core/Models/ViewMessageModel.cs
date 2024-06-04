using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public  class ViewMessageModel
    {
        [JsonProperty("_id")]
        public string? Id { get; set; }

        [JsonProperty("fromUser")]
        public string? FromUser {  get; set; }

        [JsonProperty("toUser")]
        public string? ToUser { get; set; }
        
        [JsonProperty("text")]
        public string? Text { get; set; }

        [JsonProperty("timestmap")]
        public string? SendingTimeString { get; set; }

        [JsonIgnore]
        public DateTime SendingTime
        {
            get
            {
                if (DateTime.TryParse(SendingTimeString, out var parsedDateTime))
                {
                    return parsedDateTime;
                }
                return DateTime.MinValue;
            }
            set
            {
                SendingTimeString = value.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
            }
        }

        [JsonIgnore]
        public string? CurrentUserId { get; set; }

        [JsonIgnore]
        public bool IsMyMessage { get => CurrentUserId == FromUser; }

        [JsonIgnore]
        public bool IsNotMyMessage { get => CurrentUserId != FromUser; }

    }
}
