using CommunityToolkit.Mvvm.ComponentModel;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class BaseViewModel : ObservableObject, INotifyPropertyChanged
    {
        [ObservableProperty]
        public bool _isBusy;

        [ObservableProperty]
        public string _title = string.Empty;
    }
}
