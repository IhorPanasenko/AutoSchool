using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Models;
using Newtonsoft.Json;
using System.Net.WebSockets;
using System.Text;

public class WebSocketService : IWebSocketService
{
    private ClientWebSocket _clientWebSocket;

    public event Action<MessageModel> OnMessageReceived;

    public WebSocketService()
    {
        _clientWebSocket = new ClientWebSocket();
    }

    public async Task ConnectAsync(string uri)
    {
        await _clientWebSocket.ConnectAsync(new Uri(uri), CancellationToken.None);
        ReceiveMessages();
    }

    public async Task SendMessageAsync(MessageModel messageModel)
    {
        var JsonObject = JsonConvert.SerializeObject(messageModel);
        var bytes = Encoding.UTF8.GetBytes(JsonObject);
        await _clientWebSocket.SendAsync(bytes, WebSocketMessageType.Text, true, CancellationToken.None);
    }

    private async Task ReceiveMessages()
    {
        var buffer = new byte[1024 * 4];

        while (_clientWebSocket.State == WebSocketState.Open)
        {
            var result = await _clientWebSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            var messageJson = Encoding.UTF8.GetString(buffer, 0, result.Count);
            if(messageJson.Length == 0)
            {
                continue;
            }
            try
            {
                var message = JsonConvert.DeserializeObject<MessageModel>(messageJson);
                OnMessageReceived?.Invoke(message!);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }

    public async Task DisconnectAsync()
    {
        await _clientWebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by client", CancellationToken.None);
    }
}
