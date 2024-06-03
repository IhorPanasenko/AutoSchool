using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Chat.GetChatMessages
{
    public class GetChatMessagesReponse : BaseResponse
    {
        [JsonProperty("data")]
        public GetChatMessagesResponseData? Data { get; set; }
    }
}
