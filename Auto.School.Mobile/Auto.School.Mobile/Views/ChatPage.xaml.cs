using Auto.School.Mobile.ViewModels;
using System.Collections.ObjectModel;

namespace Auto.School.Mobile.Views;

public partial class ChatPage : ContentPage
{
    private readonly ChatViewModel _viewModel;

    public ChatPage(ChatViewModel chatViewModel)
    {
        InitializeComponent();
        BindingContext = chatViewModel;
        _viewModel = chatViewModel;
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await _viewModel.ConnectAsync();
    }

    protected override async void OnDisappearing()
    {
        base.OnDisappearing();
        await _viewModel.DisconnectAsync();
    }
}