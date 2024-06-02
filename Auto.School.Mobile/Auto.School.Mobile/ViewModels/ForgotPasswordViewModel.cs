using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Validators;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class ForgotPasswordViewModel : BaseViewModel, INotifyPropertyChanged
    {

        private readonly IAuthenticationService _authenticationService;

        public ForgotPasswordViewModel(IAuthenticationService authenticationService)
        {
            CloseAction = CloseActionMethod;
            _authenticationService = authenticationService;
        }

        private string email = string.Empty;

        public string Email
        {
            get
            {
                return email;
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

                email = value;
            }
        }

        [ObservableProperty]
        private bool isEmailError = false;

        [ObservableProperty]
        private string emailErrorMessage = AppErrorMessagesConstants.InvalidEmail;

        [ObservableProperty]
        private bool isSuccess = false;

        [ObservableProperty]
        private string successMessage = AppMessages.ResetPasswordSuccessMessage;

        [ObservableProperty]
        private bool isError = false;

        [ObservableProperty]
        private string errorMessage = string.Empty;

        [RelayCommand]
        public async Task ResetPassword()
        {
            if (!ValidateInput())
            {
                return;
            }

            var result = await _authenticationService.ForgotPassword(Email);
            if (string.Compare(result.Status, ResponseStatuses.Sucess, true) == 0)
            {
                IsEmailError = false;
                IsSuccess = true;
            }
            else
            {
                IsSuccess = false;
                IsEmailError = false;
                IsError = true;
                ErrorMessage = result.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
            }
        }

        public void CloseActionMethod()
        {
            IsError = false;
            ErrorMessage = string.Empty;
        }

        public Action CloseAction { get; set; }

        private bool ValidateInput()
        {
            if (string.IsNullOrEmpty(Email))
            {
                IsError = true;
                ErrorMessage = "UserName is required";
                return false;
            }

            return true;
        }
    }
}
