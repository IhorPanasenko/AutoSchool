using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Chat.GetChatsPreview
{
    public class GetChatsPreviewResponseData
    {
        [JsonProperty("students")]
        public List<ChatPreviewModel> ChatPreview { get; set; } = []; 
    }
}
