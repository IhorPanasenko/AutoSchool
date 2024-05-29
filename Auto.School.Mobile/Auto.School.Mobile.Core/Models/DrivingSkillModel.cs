using Auto.School.Mobile.Core.Constants;
using Newtonsoft.Json;
using System.Globalization;

namespace Auto.School.Mobile.Core.Models
{
    public class DrivingSkillModel
    {
        [JsonProperty("completed")]
        public bool Completed { get; set; }

        [JsonIgnore]
        public bool IsNotCompleted {
            get => !Completed;
            private set { } 
        }

        [JsonProperty("date")]
        public DateTime? DateCompleted { get; set; }

        [JsonProperty("_id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("typeEN")]
        public string TypeEN { get; set; } = string.Empty;

        [JsonProperty("subtypeEN")]
        public string SubtypeEN { get; set; } = string.Empty;

        [JsonProperty("typeUA")]
        public string TypeUA { get; set; } = string.Empty;

        [JsonProperty("subtypeUA")]
        public string SubtypeUA { get; set; } = string.Empty;

        [JsonIgnore]
        public string Type
        {
            get => string.Compare(CultureInfo.CurrentCulture.Name, LocalesConstants.Ukraine, true) == 0 ? TypeUA : TypeEN;
            private set { }
        }

        [JsonIgnore]
        public string Subtype
        {
            get => string.Compare(CultureInfo.CurrentCulture.Name, LocalesConstants.Ukraine, true) == 0 ? SubtypeUA : SubtypeEN; 
        }
    }
}
