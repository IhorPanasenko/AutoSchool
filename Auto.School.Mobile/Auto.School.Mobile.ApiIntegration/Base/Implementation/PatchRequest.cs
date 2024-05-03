using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;
using System.Text;

namespace Auto.School.Mobile.ApiIntegration.Base.Implementation
{
    public class PatchRequest(IHttpClientService httpClientService) : IPatchRequest
    {
        private readonly IHttpClientService _httpClientService = httpClientService;

        public async Task<TResponse> ExecuteAsync<TRequest, TResponse>(
            string url,
            TRequest? requestBody) 
            where TRequest : class
            where TResponse : BaseResponse
        {
            var path = RoutesConstants.BaseUrl + url;

            var content = requestBody != null ? new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json") : null;
            var response = await _httpClientService.Client.PatchAsync(path, content);

            var responseContent = await response.Content.ReadAsStringAsync();
            var responseData = JsonConvert.DeserializeObject<TResponse>(responseContent);
            return responseData!;
        }
    }
}
