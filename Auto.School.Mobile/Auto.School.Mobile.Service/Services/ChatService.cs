using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
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
        public async Task<List<ViewMessageModel>> GetChatMessages(string currentUserid, string recipientId)
        {
            var response = await _chatRequest.GetChatMessages(recipientId);
            if(string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
            {
                var messages = response.Data!.ChatMessages;
                foreach (var item in messages)
                {
                    item.CurrentUserId = currentUserid;
                }

                return messages;
            }

            return [];
        }

        public Task<GetChatsPreviewResponse> GetChatsPreview()
        {
            var response = _chatRequest.GetChatsPreview();
            return response;
        }
    }
}
