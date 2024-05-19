namespace Auto.School.Mobile.ApiIntegration.Base.Abstract
{
    public interface IDeleteRequest
    {
        public Task<TResponse> ExecuteAsync<TRequest, TResponse>(string url, TRequest? requestBody);
    }
}
