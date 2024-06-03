﻿using Auto.School.Mobile.Core.Responses.Chat.GetChatMessages;
using Auto.School.Mobile.Core.Responses.Chat.GetChatsPreview;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface IChatService
    {
        public Task<GetChatsPreviewResponse> GetChatsPreview();

        public Task<GetChatMessagesReponse> GetChatMessages(string recipientId);
    }
}
