using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels.Instructor
{
    public partial class InstructorAllChatsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IChatService _chatService;
        private readonly ISharedService _sharedService;

        [ObservableProperty]
        private ObservableCollection<ChatPreviewModel> _chatPreviews;

        public InstructorAllChatsViewModel(IChatService chatService, ISharedService sharedService)
        {
            _chatService = chatService;
            _sharedService = sharedService;
            _chatPreviews = new ObservableCollection<ChatPreviewModel>();
            var task = LoadChatPreviews();
            task.ConfigureAwait(true);
           
        }

        private async Task LoadChatPreviews()
        {
            var response = await _chatService.GetChatsPreview();
            if (response != null && response.Data != null)
            {
                foreach (var chat in response.Data.ChatPreview)
                {
                    ChatPreviews.Add(chat);
                }
            }
        }

        [RelayCommand]
        public async Task OpenChat(ChatPreviewModel chat)
        {
            _sharedService.Add("ChatView", chat);
            await Shell.Current.GoToAsync(nameof(ChatPage));
        }

    }
}
