using System.Collections.ObjectModel;

namespace Auto.School.Mobile.Views;

public partial class ChatPage : ContentPage
{
    private readonly WebSocketService _webSocketService;
    private ObservableCollection<string> _messages;

    public ChatPage()
	{
		InitializeComponent();
        _webSocketService = new WebSocketService();
        _messages = new ObservableCollection<string>();
        MessagesCollectionView.ItemsSource = _messages;

        _webSocketService.OnMessageReceived += (message) =>
        {
            MainThread.BeginInvokeOnMainThread(() =>
            {
                _messages.Add(message);
            });
        };
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await _webSocketService.ConnectAsync("ws://localhost:8080");
    }

    protected override async void OnDisappearing()
    {
        await _webSocketService.DisconnectAsync();
        base.OnDisappearing();
    }

    private async void OnSendClicked(object sender, EventArgs e)
    {
        var message = MessageEntry.Text;
        if (!string.IsNullOrEmpty(message))
        {
            await _webSocketService.SendMessage(message);
            MessageEntry.Text = string.Empty;
        }
    }
}