using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class ReviewModel
    {
        [JsonProperty("_id")]
        public int Id { get; set; }

        [JsonProperty("review")]
        public string Review { get; set; }

        [JsonProperty("rating")]
        public int Raiting { get; set; }

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; }

        [JsonProperty("instructorId")] 
        public string InstructorId { get; set; }

        [JsonProperty("studentId")]
        public string StudentId { get; set; }
    }
}
