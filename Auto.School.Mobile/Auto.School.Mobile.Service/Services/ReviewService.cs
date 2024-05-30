using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Review;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class ReviewService(IReviewRequest reviewRequest) : IReviewService
    {
        private readonly IReviewRequest _reviewerRequest = reviewRequest;

        public Task<BaseResponse> AddReview(AddReviewModel model, string instructorId)
        {
            var response = _reviewerRequest.AddReview(model, instructorId);
            return response;
        }

        public Task<GetInstructorReviewResponse> GetInstructorReviews(string instructorId)
        {
            var res = _reviewerRequest.GetInstructorReview(instructorId);
            return res;
        }
    }
}
