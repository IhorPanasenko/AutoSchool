using Auto.School.Mobile.Core.Responses.Chat.GetChatMessages;
using Auto.School.Mobile.Core.Responses.Chat.GetChatsPreview;

namespace Auto.School.Mobile.ApiIntegration.Requests.Abstract
{
    public interface IChatRequest
    {
        public Task<GetChatMessagesReponse> GetChatMessages(string recipientId);
        
        public Task<GetChatsPreviewResponse> GetChatsPreview();
    }
}
