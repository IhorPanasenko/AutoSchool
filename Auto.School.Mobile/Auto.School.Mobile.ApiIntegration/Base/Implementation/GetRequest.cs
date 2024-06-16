using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Newtonsoft.Json;

namespace Auto.School.Mobile.ApiIntegration.Base.Implementation
{
    public class GetRequest(IHttpClientService httpClientService) : IGetRequest
    {
        private readonly IHttpClientService _httpClientService = httpClientService;

        public async Task<TResponse> ExecuteAsync<TResponse>(
            string url)
        {
            var path = RoutesConstants.BaseUrl + url;

            try
            {
                var response = await _httpClientService.Client.GetAsync(path);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var responseData = JsonConvert.DeserializeObject<TResponse>(responseContent);

                    if (responseData == null)
                    {
                        throw new Exception("Cannot Deserialize object");
                    }

                    return responseData;
                }
                else
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var responseData = JsonConvert.DeserializeObject<TResponse>(responseContent);
                    throw new HttpRequestException($"Cannot send get request to: {path},Status code: {response.StatusCode}");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
