﻿using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using Newtonsoft.Json;
using System.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Auto.School.Mobile.UserControl;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Validators;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Views.Instructor;

namespace Auto.School.Mobile.ViewModels
{
    public partial class LoginViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IAuthenticationService _authenticationService;

        public LoginViewModel(IAuthenticationService authenticationService)
        {
            CloseAction = CloseActionMethod;
            _authenticationService = authenticationService;
        }


        private string userName = string.Empty;

        public string UserName
        {
            get
            {
                return userName;
            }

            set
            {
                if (!EmailValidator.Validate(value))
                {
                    IsEmailError = true;
                }
                else
                {
                    IsEmailError = false;
                }

                userName = value;
            }
        }

        [ObservableProperty]
        private string password = string.Empty;

        [ObservableProperty]
        private bool isEmailError = false;

        [ObservableProperty]
        private string emailErrorMessage = AppErrorMessagesConstants.InvalidEmail;

        [ObservableProperty]
        private bool isError = false;

        [ObservableProperty]
        private string errorMessage = string.Empty;

        private bool isPassword = true;

        public bool IsPassword
        {
            get
            {
                return isPassword;
            }

            set
            {
                isPassword = value;
                PasswordVisibleImageSource = isPassword ? "closed_eye.png" : "open_eye.png";
                OnPropertyChanged(nameof(IsPassword));
            }
        }

        private string passwordVisibleImageSource = "closed_eye.png";

        public string PasswordVisibleImageSource
        {
            get
            {
               return passwordVisibleImageSource;
            }

            set {
                if (passwordVisibleImageSource != value)
                {
                    passwordVisibleImageSource = value;
                    OnPropertyChanged(nameof(PasswordVisibleImageSource));
                }
            }
        }

        [RelayCommand]
        public void ShowPassword()
        {
            IsPassword = !IsPassword;
        }

        [RelayCommand]
        public async Task Login()
        {
            if (!ValidateInput())
            {
                return;
            }

            var loginModel = new LoginModel { Email = UserName, Password = Password };
            var response = await _authenticationService.LoginAsync(loginModel);

            if (response == null)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                return;
            }

            if (string.Compare(response.Status, "Fail", true) == 0)
            {
                IsError = true;
                ErrorMessage = response.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                return;
            }

            if (string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
            {
                IsError = false;
                if (Preferences.ContainsKey("UserInfo"))
                {
                    Preferences.Remove("UserInfo");
                }

                Preferences.Set("UserInfo", JsonConvert.SerializeObject(response.LoginResponseData));
                Preferences.Set("UserRole", response.LoginResponseData!.UserData.Role);

                if (Preferences.ContainsKey("MyInstructorId"))
                {
                    Preferences.Remove("MyInstructorId");
                }

                if (response.LoginResponseData?.InstructorId is not null)
                {
                    Preferences.Set("MyInstructorId", JsonConvert.SerializeObject(response.LoginResponseData.InstructorId));
                }

                App.UserInfo = response.LoginResponseData!.UserData;
                Shell.Current.FlyoutHeader = new FlyoutHeaderControl();

                var appShell = Shell.Current as AppShell;
                appShell?.SetFlyoutItems();

                if (string.Compare(response.LoginResponseData.UserData.Role, AppRoles.Instructor) == 0)
                {
                    await Shell.Current.GoToAsync($"//{nameof(InstructorProfilePage)}");
                    return;
                }
                else
                {
                    await Shell.Current.GoToAsync($"//{nameof(StudentProfile)}");
                    return;
                }
            }

            IsError = true;
            ErrorMessage = AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
        }

        [RelayCommand]
        public async Task GoToRegistration()
        {
            await Shell.Current.GoToAsync($"{nameof(RegistrationPage)}");
        }

        [RelayCommand]
        public async Task ForgotPassword()
        {
            await Shell.Current.GoToAsync($"{nameof(ForgotPasswordPage)}");
        }

        public void CloseActionMethod()
        {
            IsError = false;
            ErrorMessage = string.Empty;
        }

        public Action CloseAction { get; set; }

        private bool ValidateInput()
        {
            if (string.IsNullOrEmpty(UserName))
            {
                IsError = true;
                ErrorMessage = "UserName is required";
                return false;
            }

            if (string.IsNullOrEmpty(Password))
            {
                IsError = true;
                ErrorMessage = "Password is required";
                return false;
            }

            return true;
        }
    }
}
