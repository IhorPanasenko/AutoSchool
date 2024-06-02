using Auto.School.Mobile.Core.Models;

namespace Auto.School.Mobile.Abstract
{
    public interface IWebSocketService
    {
        event Action<MessageModel> OnMessageReceived;
        Task ConnectAsync(string uri);
        Task SendMessageAsync(MessageModel message);
        Task DisconnectAsync();
    }
}
