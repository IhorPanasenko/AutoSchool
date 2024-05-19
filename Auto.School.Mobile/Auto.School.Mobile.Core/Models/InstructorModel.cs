using Newtonsoft.Json;
using System.Reflection.Metadata.Ecma335;

namespace Auto.School.Mobile.Core.Models
{
    public class InstructorModel
    {
        [JsonProperty("_id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("userId")]
        public string UserId { get; set; } = string.Empty;

        [JsonProperty("car")]
        public CarModel? Car { get; set; }

        [JsonProperty("city")]
        public CityModel? City { get; set; }

        [JsonProperty("name")]
        public required string Name { get; set; }

        [JsonProperty("surname")]
        public required string Surname { get; set; }

        [JsonProperty("vehicleCategory")]
        public string? VehicleCategory { get; set; }

        [JsonProperty("workExperiance")]
        public int WorkExperience { get; set; }

        [JsonProperty("averageRaiting")]
        public double AverageRaiting { get; set; }

        [JsonProperty("ratingsQuantity")]
        public double RaitingQuantity { get; set; }

        [JsonProperty("maxNumberOfStudents")]
        public int MaxNumberOfStudents { get; set; }

        [JsonProperty("photoUrl")]
        public string? PhotoUrl {  get; set; }

        [JsonIgnore]
        public string FullName
        {
            get => Name + ' ' + Surname;
            set { }
        }

        //TODO Add Raiting array
    }
}
