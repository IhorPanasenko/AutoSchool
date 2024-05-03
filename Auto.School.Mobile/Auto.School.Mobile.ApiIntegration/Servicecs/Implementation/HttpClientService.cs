using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using System.Net;

namespace Auto.School.Mobile.ApiIntegration.Servicecs.Implementation
{
    public class HttpClientService : IHttpClientService
    {
        private static readonly CookieContainer _cookieContainer = new CookieContainer();
        public HttpClient Client { get; }

        public HttpClientService()
        {
            HttpClientHandler handler = new HttpClientHandler();
            handler.CookieContainer = _cookieContainer;
            handler.UseCookies = true;

            Client = new HttpClient(handler);
        }
    }
}
