using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class HomeViewModel : BaseViewModel, INotifyPropertyChanged
    {
        public HomeViewModel()
        {
            
        }

        [RelayCommand]
        public async Task GoToAllInstructors()
        {
            await Shell.Current.GoToAsync($"{nameof(AllInstructorsPage)}");
        }

    }
}
