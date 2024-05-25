using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class StudentLessonModel
    {
        [JsonProperty("student")]
        public StudentModel Studnet { get; set; }

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
        public string IsAvailable { get; set; }
    }
}
