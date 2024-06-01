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
        public bool IsNotCompleted
        {
            get => !Completed;
            private set { }
        }

        [JsonProperty("date")]
        public string? DateCompletedString { get; set; }

        private DateTime _dateCompleted = DateTime.MinValue;

        [JsonIgnore]
        public DateTime DateCompleted
        {
            get
            {
                if (_dateCompleted == DateTime.MinValue && DateCompletedString != null)
                {
                    if (DateTime.TryParse(DateCompletedString, out DateTime parsedDate))
                    {
                        _dateCompleted = parsedDate;
                    }
                }
                return _dateCompleted;
            }
            set
            {
                _dateCompleted = value;
                DateCompletedString = value.ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
            }
        }

        [JsonProperty("_id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("id")]
        public string? IdSecond { get; set; } = string.Empty;

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
