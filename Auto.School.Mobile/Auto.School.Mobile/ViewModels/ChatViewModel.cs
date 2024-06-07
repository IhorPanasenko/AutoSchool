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
using System.Reflection.Metadata.Ecma335;

namespace Auto.School.Mobile.ViewModels
{
    public partial class ChatViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IWebSocketService _webSocketService;
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;
        private readonly IChatService _chatService;
        public bool isConnected = false;

        public ChatViewModel(IWebSocketService webSocketService, IInstructorService instructorService, IChatService chatService, ISharedService sharedService)
        {
            _webSocketService = webSocketService;

            _webSocketService.OnMessageReceived += (message) =>
            {
                MainThread.BeginInvokeOnMainThread(() =>
                {
                    if (message is not null && !string.IsNullOrEmpty(message.Message))
                    {
                        Messages.Add(Convert(message));
                    }
                });
            };

            _instructorService = instructorService;
            _chatService = chatService;
            _sharedService = sharedService;
            //_ = GetUsersData();
        }

        public async Task GetUsersData()
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
            else
            {
                var recipientData = _sharedService.GetValue<ChatPreviewModel>("ChatView");
                if (recipientData is not null)
                {
                    RecipientUserDataModel = new UserDataModel
                    {
                        Id = recipientData.UserId,
                        Name = recipientData.Name,
                        Surname = recipientData.Surname,
                        Role = AppRoles.Student
                    };
                }
            }

            try
            {
                await SendInitialMessage();
                await GetChatMessages();
                IsLoading = false;
                Thread.Sleep(1000);
                MessagingCenter.Send(this, "ScrollToBottom");
            }
            catch (Exception ex)
            { Console.WriteLine(ex.Message); }
        }

        private async Task GetChatMessages()
        {
            var result = await _chatService.GetChatMessages(SenderUserDataModel.Id!, RecipientUserDataModel.Id!);

            if (result.Count > 0)
            {
                Messages = new ObservableCollection<ViewMessageModel>(result);
                IsChatNotHasMessages = false;
                IsChatHasMessages = true;
            }
            else
            {
                Messages = new ObservableCollection<ViewMessageModel>(result);
                IsChatNotHasMessages = true;
                IsChatHasMessages = false;
            }
        }

        private async Task SendInitialMessage()
        {
            while (!isConnected)
            {
                Thread.Sleep(100);
            }

            var message = new SendMessageModel
            {
                SenderId = SenderUserDataModel.Id,
                Type = MessageTypes.Register
            };

            await _webSocketService.SendMessageAsync(message);
        }

        [ObservableProperty]
        private ObservableCollection<ViewMessageModel> _messages;

        [ObservableProperty]
        private string _messageText;

        [ObservableProperty]
        private UserDataModel _recipientUserDataModel;

        [ObservableProperty]
        private UserDataModel _senderUserDataModel;

        private bool isChatHasMessages = false;

        public bool IsChatHasMessages
        {
            get { return isChatHasMessages; }
            set
            {
                isChatHasMessages = value;
                OnPropertyChanged(nameof(IsChatHasMessages));
                OnPropertyChanged(nameof(IsChatNotHasMessages));
            }
        }

        public bool IsChatNotHasMessages
        {
            get { return !IsChatHasMessages; }
            private set { }
        }


        private bool isLoading = true;

        public bool IsLoading
        {
            get { return isLoading; }
            set
            {
                isLoading = value;
                OnPropertyChanged(nameof(IsLoading));
                OnPropertyChanged(nameof(IsNotLoading));
            }
        }

        public bool IsNotLoading
        {
            get { return !isLoading; }
            private set { }
        }

        [RelayCommand]
        public async Task ConnectAsync()
        {
            if (!isConnected)
            {
                await _webSocketService.ConnectAsync("ws://10.0.2.2:8080");
            }

            isConnected = true;
        }

        [RelayCommand]
        public async Task SendMessage()
        {
            if (!isConnected)
            {
                await ConnectAsync();
            }

            if (!string.IsNullOrEmpty(MessageText))
            {
                var message = new SendMessageModel
                {
                    SenderId = SenderUserDataModel.Id,
                    RecipientId = RecipientUserDataModel.Id,
                    Message = MessageText,
                    Type = MessageTypes.Message,
                    SendTime = DateTime.Now,
                };

                Messages.Add(Convert(message));
                await _webSocketService.SendMessageAsync(message);
                MessageText = string.Empty;
                MessagingCenter.Send(this, "ScrollToBottom");
            }
        }

        [RelayCommand]
        public async Task DisconnectAsync()
        {
            if (isConnected)
            {
                await _webSocketService.DisconnectAsync();
            }
            isConnected = false;
        }

        [RelayCommand]
        public async Task GoToBottom()
        {
            MessagingCenter.Send(this, "ScrollToBottom");
        }

        private ViewMessageModel Convert(SendMessageModel model)
        {
            return new ViewMessageModel
            {
                FromUser = model.SenderId,
                ToUser = model.RecipientId,
                Id = Guid.NewGuid().ToString(),
                Text = model.Message,
                SendingTime = model.SendTime,
                CurrentUserId = model.SenderId
            };
        }
        private SendMessageModel Convert(ViewMessageModel model)
        {
            return new SendMessageModel
            {
                Message = model.Text,
                SenderId = model.FromUser,
                RecipientId = model.ToUser,
                Type = MessageTypes.Message,
            };
        }
    }
}
