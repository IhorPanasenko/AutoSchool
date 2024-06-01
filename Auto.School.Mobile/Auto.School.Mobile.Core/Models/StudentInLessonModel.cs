using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
     public class StudentInLessonModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("surname")]
        public string Surname { get; set; }

        [JsonProperty("studentId")]
        public string StudentId { get; set; }

        [JsonIgnore]
        public string FullName { get => $"{Name} {Surname}"; }
    }
}
