using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Net.Http;
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

        public async Task<TResponse> UploadImageAsync<TResponse>(string url, Stream imageStream, string imageName)
        where TResponse : BaseResponse
        {
            var path = RoutesConstants.BaseUrl + url;
            using var multipartContent = new MultipartFormDataContent();

            var imageContent = new StreamContent(imageStream);
            imageContent.Headers.ContentType = new MediaTypeHeaderValue("image/jpg");
            multipartContent.Add(imageContent, "photo", imageName);

            var request = new HttpRequestMessage(new HttpMethod("PATCH"), path)
            {
                Content = multipartContent
            };

            var response = await _httpClientService.Client.SendAsync(request);

            var responseContent = await response.Content.ReadAsStringAsync();
            var responseData = JsonConvert.DeserializeObject<TResponse>(responseContent);

            return responseData!;
        }
    }
}
