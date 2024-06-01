using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Review.GetInstructorReview
{
    public class GetInstructorReviewResponse : BaseResponse
    {
        [JsonProperty("data")]
        public GetInstructorReviewResponseData Data { get; set; }
    }
}
