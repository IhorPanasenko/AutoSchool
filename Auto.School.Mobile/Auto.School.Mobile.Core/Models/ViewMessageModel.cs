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
        public DateTime SendingTime { get; set; }
    }
}
