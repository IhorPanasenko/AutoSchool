namespace Auto.School.Mobile.ApiIntegration.Base.Abstract
{
    public interface IDeleteRequest
    {
        public Task<TResponse> ExecuteAsync<TResponse>(string url);
    }
}
