﻿using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class CarModel
    {
        [JsonProperty("_id")]
        public string Id { get; set; } = string.Empty;

        [JsonProperty("model")]
        public string Model { get; set; } = string.Empty;
        
        [JsonProperty("year")]
        public int Year { get; set; }

        [JsonProperty("transmission")]
        public string Transmission { get; set; } = string.Empty;

        [JsonProperty("photoUrl")]
        public string PhotoUrl { get; set; } = string.Empty;

        [JsonProperty("averageRating")]
        public double AverageRating { get; set; }

        [JsonProperty("totalRatings")]
        public int NumberRatings { get; set; }

        public override string ToString()
        {
            return $"{Model}, {Year}";
        }

    }
}
