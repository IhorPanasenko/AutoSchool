using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using Newtonsoft.Json;
using System.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Auto.School.Mobile.UserControl;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Validators;
using Auto.School.Mobile.Core.Constants;

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

        [ObservableProperty]
        private bool isPasswordVisible = false;

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

            if (string.Compare(response.Status, "Success", true) == 0)
            {
                if (Preferences.ContainsKey("UserInfo"))
                {
                    Preferences.Remove("UserInfo");
                }

                Preferences.Set("UserInfo", JsonConvert.SerializeObject(response.LoginResponseData));
                App.UserInfo = response.LoginResponseData!.UserData;

                Shell.Current.FlyoutHeader = new FlyoutHeaderControl();
                await Shell.Current.GoToAsync($"//{nameof(HomePage)}");
                return;
            }

            IsError = true;
            ErrorMessage = AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
        }

        [RelayCommand]
        public async Task GoToRegistration()
        {
            await Shell.Current.GoToAsync($"/{nameof(RegistrationPage)}");
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
