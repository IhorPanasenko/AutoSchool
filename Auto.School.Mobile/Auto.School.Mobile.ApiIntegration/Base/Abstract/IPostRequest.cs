namespace Auto.School.Mobile.ApiIntegration.Base.Abstract
{
    public interface IPostRequest
    {
        public Task<TResponse> ExecuteAsync<TRequest, TResponse>(string url, TRequest? requestBody);
    }
}
