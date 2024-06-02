using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Auth.Login;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Data;

namespace Auto.School.Mobile.ViewModels
{
    public partial class ChatViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IWebSocketService _webSocketService;
        private readonly IInstructorService _instructorService;
        private readonly IStudentService _studentService;
        private readonly ISharedService _sharedService;

        [ObservableProperty]
        private ObservableCollection<string?> _messages;

        [ObservableProperty]
        private string _messageText;

        [ObservableProperty]
        private UserDataModel _recipientUserDataModel;

        [ObservableProperty]
        private UserDataModel _senderUserDataModel;

        public ChatViewModel(IWebSocketService webSocketService, IInstructorService instructorService, IStudentService studentService)
        {
            _webSocketService = webSocketService;
            _messages = new ObservableCollection<string>();

            _webSocketService.OnMessageReceived += (message) =>
            {
                MainThread.BeginInvokeOnMainThread(() =>
                {
                    if (!string.IsNullOrEmpty(message.Message))
                    {
                        Messages.Add(message.Message!);
                    }
                });
            };

            _instructorService = instructorService;
            _studentService = studentService;
            _ = GetUsersData();
        }

        private async Task GetUsersData()
        {
            var userDataJson = Preferences.Get("UserInfo", string.Empty);
            var userData = JsonConvert.DeserializeObject<LoginResponseData>(userDataJson);
            SenderUserDataModel = userData!.UserData;
            if (string.Compare(userData.UserData.Role, AppRoles.Student, true) == 0 && userData.InstructorId is not null)
            {
                var recipientData = await _instructorService.GetOne(userData.InstructorId);
                RecipientUserDataModel = new UserDataModel
                {
                    Id = recipientData.Instructor.UserId,
                    Name = recipientData.Instructor.Name,
                    Surname = recipientData.Instructor.Surname,
                    Role = AppRoles.Instructor
                };
            }

            await SendInitialMessage();
        }

        private async Task SendInitialMessage()
        {
            var message = new MessageModel
            {
                SenderId = SenderUserDataModel.Id,
                Type = MessageTypes.Register
            };

            await _webSocketService.SendMessageAsync(message);
        }

        [RelayCommand]
        public async Task ConnectAsync()
        {
            await _webSocketService.ConnectAsync("ws://10.0.2.2:8080");
        }

        [RelayCommand]
        public async Task SendMessage()
        {
            if (!string.IsNullOrEmpty(MessageText))
            {
                Messages.Add("My message " + MessageText);
                var message = new MessageModel
                {
                    SenderId = SenderUserDataModel.Id,
                    RecipientId = SenderUserDataModel.Id, //RecipientUserDataModel.Id,
                    Message = MessageText,
                    Type = MessageTypes.Message
                };

                await _webSocketService.SendMessageAsync(message);
                MessageText = string.Empty;
            }
        }

        [RelayCommand]
        public async Task DisconnectAsync()
        {
            await _webSocketService.DisconnectAsync();
        }
    }
}
