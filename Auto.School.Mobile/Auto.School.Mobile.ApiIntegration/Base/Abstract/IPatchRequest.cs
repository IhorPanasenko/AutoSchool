using Auto.School.Mobile.Core.Responses.Base;

namespace Auto.School.Mobile.ApiIntegration.Base.Abstract
{
    public interface IPatchRequest
    {
        public Task<TResponse> ExecuteAsync<TRequest, TResponse>(string url, TRequest? requestBody = null) 
            where TRequest : class 
            where TResponse: BaseResponse;

        public Task<TResponse> UploadImageAsync<TResponse>(string url, Stream imageStream, string imageName)
            where TResponse : BaseResponse;
    }
}
