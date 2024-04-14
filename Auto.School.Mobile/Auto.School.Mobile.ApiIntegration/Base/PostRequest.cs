using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.Core.Responses.Login;
using Newtonsoft.Json;
using System.Text;

namespace Auto.School.Mobile.ApiIntegration.Base
{
    public class PostRequest
    {
        public static async Task<TResponse> ExecuteAsync<TRequest, TResponse>(
            string url,
            TRequest? requestBody)
        {
            var jsonContent = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            using var httpClient = new HttpClient();
            var path = RoutesConstants.BaseUrl + url;
            var response = await httpClient.PostAsync(path, content);

            var responseContent = await response.Content.ReadAsStringAsync();
            var responseData = JsonConvert.DeserializeObject<TResponse>(responseContent);
            return responseData!;
        }
    }
}
