using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;


namespace Auto.School.Mobile.SharedViewModels.Alerts
{
    public partial class ErrorAlertViewModel : ObservableObject, INotifyPropertyChanged
    {
        [ObservableProperty]
        private bool isError = false;

        [ObservableProperty]
        private string errorMessage = string.Empty;

        [RelayCommand]
        public void CloseAlert()
        {
            IsError = false;
            ErrorMessage = string.Empty;
        }
    }
}
