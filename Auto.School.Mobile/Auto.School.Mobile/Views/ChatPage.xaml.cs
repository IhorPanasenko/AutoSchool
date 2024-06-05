using Auto.School.Mobile.ViewModels;
using System.Collections;
using System.Collections.ObjectModel;

namespace Auto.School.Mobile.Views;

public partial class ChatPage : ContentPage
{
    private readonly ChatViewModel _viewModel;
    public event EventHandler ScrollToBottomRequested;

    public ChatPage(ChatViewModel chatViewModel)
    {
        InitializeComponent();
        BindingContext = chatViewModel;
        _viewModel = chatViewModel;
        MessagingCenter.Subscribe<ChatViewModel>(this, "ScrollToBottom", (sender) =>
        {
            ScrollToBottom();
        });
    }
    public void ScrollToBottom()
    {
        if (MessagesCollectionView.ItemsSource is IList items && items.Count > 0)
        {
            MessagesCollectionView.ScrollTo(items[items.Count - 1], position: ScrollToPosition.End, animate: true);
        }
    }

    protected async override void OnAppearing()
    {
        base.OnAppearing();
        await _viewModel.ConnectAsync(); 
    }

    protected override async void OnDisappearing()
    {
        base.OnDisappearing();
        await _viewModel.DisconnectAsync();
        MessagingCenter.Unsubscribe<ChatViewModel>(this, "ScrollToBottom");
    }

    private void Messages_CollectionChanged(object sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e)
    {
        ScrollToBottom();
    }

    private void OnScrollToBottomRequested(object sender, EventArgs e)
    {
        if (MessagesCollectionView.ItemsSource is IList items && items.Count > 0)
        {
            MessagesCollectionView.ScrollTo(items[items.Count - 1], position: ScrollToPosition.End, animate: false);
        }
    }
}