using Auto.School.Mobile.Core.Models;

namespace Auto.School.Mobile.Abstract
{
    public interface IWebSocketService
    {
        event Action<SendMessageModel> OnMessageReceived;
        Task ConnectAsync(string uri);
        Task SendMessageAsync(SendMessageModel message);
        Task DisconnectAsync();
    }
}
