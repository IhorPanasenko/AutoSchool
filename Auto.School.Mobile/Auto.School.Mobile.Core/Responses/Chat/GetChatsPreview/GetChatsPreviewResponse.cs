using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Chat.GetChatsPreview
{
    public class GetChatsPreviewResponse : BaseResponse
    {
        [JsonProperty("data")]
        public GetChatsPreviewResponseData? Data { get; set; }
    }
}
