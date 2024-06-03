using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Responses.Chat.GetChatMessages;
using Auto.School.Mobile.Core.Responses.Chat.GetChatsPreview;
using Auto.School.Mobile.Service.Interfaces;

namespace Auto.School.Mobile.Service.Services
{
    public class ChatService : IChatService
    {
        private readonly IChatRequest _chatRequest;

        public ChatService(IChatRequest chatRequest)
        {
            _chatRequest = chatRequest;
        }
        public Task<GetChatMessagesReponse> GetChatMessages(string recipientId)
        {
            var response =_chatRequest.GetChatMessages(recipientId);
            return response;
        }

        public Task<GetChatsPreviewResponse> GetChatsPreview()
        {
            var response = _chatRequest.GetChatsPreview();
            return response;
        }
    }
}
