using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.ApiIntegration.Servicecs.Implementation;
using Auto.School.Mobile.Core.Responses.Chat.GetChatMessages;
using Auto.School.Mobile.Core.Responses.Chat.GetChatsPreview;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class ChatRequest : IChatRequest
    {
        private readonly IGetRequest _getRequest;

        private readonly ITokenExpirationService _tokenExpirationService;

        public ChatRequest(IGetRequest getRequest, ITokenExpirationService tokenExpirationService)
        {
            _getRequest = getRequest;
            _tokenExpirationService = tokenExpirationService;
        }

        public async Task<GetChatMessagesReponse> GetChatMessages(string recipientId)
        {
            _tokenExpirationService.TryRefreshToken();
            var route = RoutesConstants.GetChatMessages + recipientId;
            var response = await _getRequest.ExecuteAsync<GetChatMessagesReponse>(route);
            return response;
        }

        public async Task<GetChatsPreviewResponse> GetChatsPreview()
        {
            _tokenExpirationService.TryRefreshToken();
            var response = await _getRequest.ExecuteAsync<GetChatsPreviewResponse>(RoutesConstants.GetChatsPreview);
            return response;
        }
    }
}
