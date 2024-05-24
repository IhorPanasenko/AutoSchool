using Auto.School.Mobile.Core.Constants;
using Newtonsoft.Json;
using System.Globalization;

namespace Auto.School.Mobile.Core.Models
{
    public class CityModel
    {
        [JsonProperty("_id")]
        public required string Id { get; set; }

        [JsonProperty("nameEN")]
        public required string NameEn { get; set; }

        [JsonProperty("nameUA")]
        public required string NameUa { get; set; }

        [JsonIgnore]
        public string Name
        {
            get
            {
                if (string.Compare(CultureInfo.CurrentCulture.Name, LocalesConstants.Ukraine, true) == 0) { return NameUa; }
                return NameEn;
            }

            private set { }
        }
    }
}
