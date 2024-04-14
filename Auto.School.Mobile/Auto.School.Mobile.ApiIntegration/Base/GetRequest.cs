using Auto.School.Mobile.ApiIntegration.Constants;
using Newtonsoft.Json;

namespace Auto.School.Mobile.ApiIntegration.Base
{
    public class GetRequest
    {
        public static async Task<TResponse> ExecuteAsync<TResponse>(
            string url)
        {
            using var httpClient = new HttpClient();
            var path = RoutesConstants.BaseUrl + url;

            try
            {
                var response = await httpClient.GetAsync(path);

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
                    throw new HttpRequestException($"Cannot send get request to: {path},Status code: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while processing the GET request: {ex.Message}");
            }
        }
    }
}
