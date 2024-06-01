using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Review.GetInstructorReview;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IReviewRequest
    {
        public Task<GetInstructorReviewResponse> GetInstructorReview(string instructorId);

        public Task<BaseResponse> AddReview(AddReviewModel addReviewModel, string instructorId);
    }
}
