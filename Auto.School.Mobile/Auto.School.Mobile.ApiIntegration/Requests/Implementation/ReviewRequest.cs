using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Helpers;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Review;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class ReviewRequest(IGetRequest getRequest, IPostRequest postRequest) : IReviewRequest
    {
        private readonly IGetRequest _getRequest = getRequest;

        private readonly IPostRequest _postRequest = postRequest;

        public async Task<BaseResponse> AddReview(AddReviewModel addReviewModel, string instructorId)
        {
            var Route = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.AddReview, instructorId);
            var  response =await _postRequest.ExecuteAsync<AddReviewModel, BaseResponse>(Route, addReviewModel);
            return response;
        }

        public async Task<GetInstructorReviewResponse> GetInstructorReview(string instructorId)
        {
            var Route = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.GetInstructorsReview, instructorId);
            var response = await _getRequest.ExecuteAsync<GetInstructorReviewResponse>(Route);
            return response;
        }
    }
}
