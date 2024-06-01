using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Auth.UpdatePassword
{
    public class UpdatePasswordResponse : BaseResponse
    {
        [JsonProperty("data")]
        public UpdatePasswordResponseData Data { get; set; }
    }
}
