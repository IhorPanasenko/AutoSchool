using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Student.GetInfoMe
{
    public class GetInfoMeResponse : BaseResponse
    {
        [JsonProperty("data")]
        public GetInfoMeResponseData Data { get; set; }
    }
}
