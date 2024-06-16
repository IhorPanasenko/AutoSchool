using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Base.Implementation;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.ApiIntegration.Servicecs.Implementation;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Responses.Base;
using Auto.School.Mobile.Core.Responses.Instructor;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Auto.School.Mobile.Tests.BaseRequestsTests.GetRequestTests
{
    [TestClass]
    public class GetRequestIntegrationTest
    {
        private IHttpClientService _httpClientService;
        private IGetRequest _getRequest;

        [TestInitialize]
        public void SetUp()
        {
            Environment.SetEnvironmentVariable("BASE_URL", "http://localhost:3000/api/");
            _httpClientService = new HttpClientService();
            _getRequest = new GetRequest(_httpClientService);
        }

        [TestMethod]
        public async Task ExecuteAsync_ShouldReturnSuccessResponse()
        {
            // Act
            var result = await _getRequest.ExecuteAsync<GetAllInstructorsResponse>(RoutesConstants.GetAllInstructors);

            var expectedStatus = ResponseStatuses.Sucess.ToLower();

            // Assert
            Assert.IsNotNull(result);
            
            Assert.AreEqual(expectedStatus, result.Status?.ToLower());
        }

        [TestMethod]
        public async Task ExecuteAsync_ShouldHandleInvalidUrl()
        {
            var invalidUrl = "Invalid/Url";
            try
            {
                // Act
                await _getRequest.ExecuteAsync<object>(invalidUrl);
                Assert.Fail("Expected exception was not thrown.");
            }
            catch (HttpRequestException ex)
            {
                // Assert
                Assert.IsTrue(ex.Message.Contains("404") || ex.Message.Contains("NotFound"));
            }
        }

        [TestMethod]
        public async Task ExecuteAsync_ShouldHandleInvalidReturnType()
        {
            try
            {
                // Act
                await _getRequest.ExecuteAsync<int>(RoutesConstants.GetAllInstructors);
                Assert.Fail("Expected exception was not thrown.");
            }
            catch(JsonReaderException ex)
            {
                // Assert
                Assert.IsTrue(true);
            }
            catch (Exception ex)
            {
                Assert.Fail($"Unexpected exception type thrown: {ex.GetType()}");
            }
        }
    }
}
