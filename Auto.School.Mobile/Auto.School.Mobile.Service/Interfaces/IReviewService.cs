using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Review;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface IReviewService
    {
        public Task<GetInstructorReviewResponse> GetInstructorReviews(string instructorId);

        public Task<BaseResponse> AddReview(AddReviewModel model, string instructorId);
    }
}
