using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Chat.GetChatMessages
{
    public class GetChatMessagesResponseData
    {
        [JsonProperty("messages")]
        public List<ViewMessageModel> ChatMessages { get; set; } = [];
    }
}
