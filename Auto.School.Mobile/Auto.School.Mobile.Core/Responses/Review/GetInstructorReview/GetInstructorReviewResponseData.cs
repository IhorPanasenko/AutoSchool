using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;

namespace Auto.School.Mobile.Core.Responses.Review.GetInstructorReview
{
    public class GetInstructorReviewResponseData
    {
        [JsonProperty("reviews")]
        public List<ReviewModel> Reviews { get; set; }
    }
}
