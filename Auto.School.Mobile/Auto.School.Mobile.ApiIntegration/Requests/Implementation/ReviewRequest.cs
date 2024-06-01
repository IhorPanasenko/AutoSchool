using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Base.Implementation;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Helpers;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Review.GetInstructorReview;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class ReviewRequest(IGetRequest getRequest, IPostRequest postRequest, IDeleteRequest deleteRequest) : IReviewRequest
    {
        private readonly IGetRequest _getRequest = getRequest;

        private readonly IPostRequest _postRequest = postRequest;
        private readonly IDeleteRequest _deleteRequest = deleteRequest;

        public async Task<BaseResponse> AddReview(AddReviewModel addReviewModel, string instructorId)
        {
            var route = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.AddReview, instructorId);
            var  response =await _postRequest.ExecuteAsync<AddReviewModel, BaseResponse>(route, addReviewModel);
            return response;
        }

        public async Task<BaseResponse> DeleteReview(string instructorId, string reviewId)
        {
            var route = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.DeleteReview, instructorId) + $"{reviewId}";
            var response = await _deleteRequest.ExecuteAsync<BaseResponse>(route);
            return response;
        }

        public async Task<GetInstructorReviewResponse> GetInstructorReview(string instructorId)
        {
            var route = FormUrlHelper.InsertIdIntoUrl(RoutesConstants.GetInstructorsReview, instructorId);
            var response = await _getRequest.ExecuteAsync<GetInstructorReviewResponse>(route);
            return response;
        }
    }
}
