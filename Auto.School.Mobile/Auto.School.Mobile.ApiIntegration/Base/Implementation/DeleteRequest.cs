using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.ApiIntegration.Servicecs.Implementation;
using Newtonsoft.Json;
using System.Text;

namespace Auto.School.Mobile.ApiIntegration.Base.Implementation
{
    public class DeleteRequest(IHttpClientService httpClientService) : IDeleteRequest
    {
        private readonly IHttpClientService _httpClientService = httpClientService;
        public async Task<TResponse> ExecuteAsync<TResponse>(string url)
        {
            var path = RoutesConstants.BaseUrl + url;
            var response = await _httpClientService.Client.DeleteAsync(path);

            var responseContent = await response.Content.ReadAsStringAsync();
            var responseData = JsonConvert.DeserializeObject<TResponse>(responseContent);
            return responseData!;
        }
    }
}
