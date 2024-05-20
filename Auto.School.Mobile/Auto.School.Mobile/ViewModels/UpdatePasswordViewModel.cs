using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class UpdatePasswordViewModel(IAuthenticationService authenticationService) : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IAuthenticationService _authenticationService = authenticationService;

        [ObservableProperty]
        private string oldPassword;

        [ObservableProperty]
        private string newPassword;

        [ObservableProperty]
        private string errorMessage;

        [RelayCommand]
        public async Task UpdatePasswordAsync()
        {
            if (string.IsNullOrEmpty(OldPassword) || string.IsNullOrEmpty(NewPassword))
            {
                ErrorMessage = "Please enter both old and new passwords.";
                return;
            }

            var response = await _authenticationService.UpdatePassword(OldPassword, NewPassword);

            if (string.Compare(response.Status, ResponseStatuses.Sucess) == 0)
            {
                // Close the popup, you might need to handle this in the view
                // Or you can set a flag in the ViewModel and bind it to the view to close the popup
            }
            else
            {
                ErrorMessage = response.Error?.Status!;
            }
        }
    }
}
