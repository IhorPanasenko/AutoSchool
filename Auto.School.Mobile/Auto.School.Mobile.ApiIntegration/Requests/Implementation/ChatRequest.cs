using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Chat.GetChatMessages;
using Auto.School.Mobile.Core.Responses.Chat.GetChatsPreview;

namespace Auto.School.Mobile.ApiIntegration.Requests.Implementation
{
    public class ChatRequest : IChatRequest
    {
        private readonly IGetRequest _getRequest;

        public ChatRequest(IGetRequest getRequest)
        {
            _getRequest = getRequest;
        }

        public async Task<GetChatMessagesReponse> GetChatMessages(string recipientId)
        {
            var route = RoutesConstants.GetChatMessages + recipientId;
            var response = await _getRequest.ExecuteAsync<GetChatMessagesReponse>(route);
            return response;
        }

        public async Task<GetChatsPreviewResponse> GetChatsPreview()
        {
            var response = await _getRequest.ExecuteAsync<GetChatsPreviewResponse>(RoutesConstants.GetChatsPreview);
            return response;
        }
    }
}
