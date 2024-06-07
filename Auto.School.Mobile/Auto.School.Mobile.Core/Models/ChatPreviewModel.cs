using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Models
{
    public class ChatPreviewModel
    {
        [JsonProperty("_id")]
        public string? Id { get; set; }

        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("surname")]
        public string? Surname { get; set; }

        [JsonProperty("userId")]
        public string? UserId { get; set; }

        [JsonProperty("photoUrl")]
        public string? PhotoUrl { get; set; }

        [JsonProperty("lastMessage")]
        public ViewMessageModel? LastMessage { get; set; }

        [JsonIgnore]
        public bool HasMessages { get => LastMessage is not null; }

        [JsonIgnore]
        public bool HasNoMessages {  get => LastMessage is null; }
    }
}
