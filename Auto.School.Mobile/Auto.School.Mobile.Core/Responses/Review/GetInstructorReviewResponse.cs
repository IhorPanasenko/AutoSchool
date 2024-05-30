using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Review
{
    public class GetInstructorReviewResponse : BaseResponse
    {
        [JsonProperty("data")]
        public List<ReviewModel> Reviews { get; set; }
    }
}
