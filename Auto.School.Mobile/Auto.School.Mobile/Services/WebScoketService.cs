using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

public class WebSocketService
{
    private ClientWebSocket _clientWebSocket;

    public event Action<string> OnMessageReceived;

    public WebSocketService()
    {
        _clientWebSocket = new ClientWebSocket();
    }

    public async Task ConnectAsync(string uri)
    {
        await _clientWebSocket.ConnectAsync(new Uri(uri), CancellationToken.None);
        await ReceiveMessages();
    }

    public async Task SendMessage(string message)
    {
        var bytes = Encoding.UTF8.GetBytes(message);
        await _clientWebSocket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);
    }

    private async Task ReceiveMessages()
    {
        var buffer = new byte[1024 * 4];

        while (_clientWebSocket.State == WebSocketState.Open)
        {
            var result = await _clientWebSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            OnMessageReceived?.Invoke(message);
        }
    }

    public async Task DisconnectAsync()
    {
        await _clientWebSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by client", CancellationToken.None);
    }
}
