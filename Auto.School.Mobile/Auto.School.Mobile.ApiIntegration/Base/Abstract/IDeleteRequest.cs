using Auto.School.Mobile.Core.Responses.Base;

namespace Auto.School.Mobile.ApiIntegration.Base.Abstract
{
    public interface IDeleteRequest
    {
        Task<TResponse> ExecuteAsync<TResponse>(string url) where TResponse : BaseResponse, new();
    }
}
