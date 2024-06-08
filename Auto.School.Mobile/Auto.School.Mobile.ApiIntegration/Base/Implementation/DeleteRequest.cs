using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Responses.Base;
using Newtonsoft.Json;
using System.Net;
using System.Text;

namespace Auto.School.Mobile.ApiIntegration.Base.Implementation
{
    public class DeleteRequest(IHttpClientService httpClientService) : IDeleteRequest
    {
        private readonly IHttpClientService _httpClientService = httpClientService;
        public async Task<TResponse> ExecuteAsync<TResponse>(string url) where TResponse : BaseResponse, new()
        {
            var path = RoutesConstants.BaseUrl + url;
            var response = await _httpClientService.Client.DeleteAsync(path);

            var responseContent = await response.Content.ReadAsStringAsync();
            TResponse? responseData = null;
            try
            {
                responseData = JsonConvert.DeserializeObject<TResponse>(responseContent);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            if (responseData is null && (response.StatusCode >= HttpStatusCode.OK && response.StatusCode < HttpStatusCode.IMUsed))
            {
                return new TResponse
                {
                    Status = ResponseStatuses.Sucess,
                };
            }

            return responseData!;
        }
    }
}
