using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Chat.GetChatMessages;
using Auto.School.Mobile.Core.Responses.Chat.GetChatsPreview;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface IChatService
    {
        public Task<GetChatsPreviewResponse> GetChatsPreview();

        public Task<List<ViewMessageModel>> GetChatMessages(string currentUserid, string recipientId);
    }
}
