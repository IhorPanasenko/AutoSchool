using Auto.School.Mobile.ApiIntegration.Base;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Login;
using Newtonsoft.Json;
using System.Text;
using System;

namespace Auto.School.Mobile.ApiIntegration.AuthenticationRequests
{
    public class LoginRequest : ILoginRequest
    {
        private const string uri = "auth/login";
        public async Task<LoginResponse?> Execute(LoginModel loginModel)
        {
            try
            {
                //var loginResponse = await PostRequest.ExecuteAsync<LoginModel, LoginResponse>(uri, loginModel);

                var jsonContent = JsonConvert.SerializeObject(loginModel);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                using var httpClient = new HttpClient();
                //var path = BaseUrl + url;
                Uri uri = new Uri(string.Format("http://localhost:3000/api/auth/login", string.Empty));
                var response = await httpClient.PostAsync(uri, content);
                var i = 1;

                //if (response.IsSuccessStatusCode)
                //{
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var responseData = JsonConvert.DeserializeObject<LoginResponse>(responseContent);

                    if (responseData == null)
                    {
                        throw new Exception("Cannot Deserialize object");
                    }

                    return responseData;
                //}
                //else
                //{
                    //var message = response.RequestMessage;
                    //throw new HttpRequestException($"Cannot send post reuest,Status code: {response.StatusCode}");
                //}

                //return loginResponse;
            }
            catch (Exception ex)
            {
                var message = ex.Message;
                return null;
            }
           
        }
    }
}
