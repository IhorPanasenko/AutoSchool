using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class LessonModel
    {
        [JsonProperty("_id")]
        public string Id { get; set; }

        [JsonProperty("instructorId")]
        public string InstructorId { get; set; }

        [JsonProperty("price")]
        public int Price { get; set; }

        [JsonProperty("date")]
        public DateTime Date { get; set; }

        [JsonProperty("fromHour")]
        public string FromHour { get; set; }

        [JsonProperty("toHour")]
        public string ToHour { get; set; }

        [JsonProperty("isAvailable")]
        public bool IsAvailable { get; set; }

        [JsonIgnore]
        public string DayOfWeek
        {
            get => Date.DayOfWeek.ToString();
            
            private set { }
        }
    }
}
