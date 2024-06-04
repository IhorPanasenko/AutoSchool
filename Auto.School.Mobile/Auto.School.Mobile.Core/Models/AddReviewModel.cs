using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class AddReviewModel
    {
        [JsonProperty("review")]
        public string? Review { get; set; }

        [JsonProperty("rating")]
        public int Raiting { get; set; }
    }
}
