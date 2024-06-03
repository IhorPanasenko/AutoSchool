﻿using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Auth.Login;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class ChatViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IWebSocketService _webSocketService;
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;
        private readonly IChatService _chatService;

        public ChatViewModel(IWebSocketService webSocketService, IInstructorService instructorService, IChatService chatService)
        {
            _webSocketService = webSocketService;
            _messages = new ObservableCollection<ViewMessageModel>();

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
            _ = GetUsersData();
            _chatService = chatService;
        }

        private async Task GetUsersData()
        {
            await ConnectAsync();
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
                var recipientData = _sharedService.GetValue<ChatPreviewModel>("OneChat");
                if(recipientData is not null)
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

            await SendInitialMessage();
            await GetChatMessages();
        }

        private async Task GetChatMessages()
        {
            var result = await _chatService.GetChatMessages(RecipientUserDataModel.Id!);

            if(string.Compare(result.Status, ResponseStatuses.Sucess, true) == 0)
            {
                if (result.Data is not null && result.Data.ChatMessages.Count > 0)
                {
                    Messages = new ObservableCollection<ViewMessageModel>(result.Data!.ChatMessages);
                    IsChatNotHasMessages = false;
                    IsChatHasMessages = true;
                }
                else
                {
                    IsChatNotHasMessages = true;
                    IsChatHasMessages = false;
                }
            }
        }

        private async Task SendInitialMessage()
        {
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

        [ObservableProperty]
        private bool isChatNotHasMessages = true;

        [ObservableProperty]
        private bool isChatHasMessages = false;

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
                var message = new SendMessageModel
                {
                    SenderId = SenderUserDataModel.Id,
                    RecipientId = RecipientUserDataModel.Id,
                    Message = MessageText,
                    Type = MessageTypes.Message
                };

                Messages.Add(Convert(message));
                await _webSocketService.SendMessageAsync(message);
                MessageText = string.Empty;
            }
        }

        [RelayCommand]
        public async Task DisconnectAsync()
        {
            await _webSocketService.DisconnectAsync();
        }

        private ViewMessageModel Convert(SendMessageModel model)
        {
            return new ViewMessageModel
            {
                FromUser = model.SenderId,
                ToUser = model.RecipientId,
                Id = Guid.NewGuid().ToString(),
                Text = model.Message,
                SendingTime = DateTime.Now,
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
