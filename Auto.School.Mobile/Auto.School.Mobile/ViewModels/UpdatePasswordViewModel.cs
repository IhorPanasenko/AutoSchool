using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Validators;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class UpdatePasswordViewModel(IAuthenticationService authenticationService, IPopupService popupService) : BaseViewModel, INotifyPropertyChanged
        {
        private readonly IAuthenticationService _authenticationService = authenticationService;
        private readonly IPopupService _popupService = popupService;

        [ObservableProperty]
        private Popup popupInstance;

        private string oldPassword = string.Empty;

        public string OldPassword
        {
            get => oldPassword;
            set
            {
                var validationResult = PasswordValidator.Validate(value);

                if (validationResult is not null)
                {
                    IsOldPasswordError = true;
                    OldPasswordErrorMessage = validationResult;
                }
                else
                {
                    IsOldPasswordError = false;
                    OldPasswordErrorMessage = string.Empty;
                }

                oldPassword = value;
            }
        }

        private string newPassword = string.Empty;

        public string NewPassword
        {
            get => newPassword;
            set
            {
                var validationResult = PasswordValidator.Validate(value);

                if (validationResult is not null)
                {
                    IsNewPasswordError = true;
                    NewPasswordErrorMessage = validationResult;
                }
                else
                {
                    IsNewPasswordError = false;
                    NewPasswordErrorMessage = string.Empty;
                }

                newPassword = value;
            }
        }


        [ObservableProperty]
        private bool isOldPasswordError = false;

        [ObservableProperty]
        private string oldPasswordErrorMessage = string.Empty;

        [ObservableProperty]
        private bool isNewPasswordError = false;

        [ObservableProperty]
        private string newPasswordErrorMessage = string.Empty;

        [ObservableProperty]
        private bool isSuccessMessage = false;

        [ObservableProperty]
        private string successMessage = string.Empty;

        [RelayCommand]
        public async Task UpdatePasswordAsync()
        {
            if (string.IsNullOrEmpty(OldPassword) || string.IsNullOrEmpty(NewPassword))
            {
                NewPasswordErrorMessage = AppErrorMessagesConstants.UpdatePasswordNotFilled;
                IsNewPasswordError = true;
                return;
            }

            var response = await _authenticationService.UpdatePassword(OldPassword, NewPassword);
            IsNewPasswordError = false;

            if (string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
            {
                IsSuccessMessage = true;
                SuccessMessage = AppMessages.SuccessPasswordUpdate;
                Thread.Sleep(3000);
                _popupService.ClosePopup(PopupInstance);
            }
            else
            {
                NewPasswordErrorMessage = response.Error?.Status!;
            }
        }

        [RelayCommand]
        public void Cancel()
        {
            _popupService.ClosePopup(PopupInstance);
        }
    }
}
