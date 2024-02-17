using Auto.School.Mobile.Pages;
using CommunityToolkit.Mvvm.Input;

namespace Auto.School.Mobile.ViewModels
{
    public partial class AppShellViewModel : BaseViewModel
    {
        [RelayCommand]
        public async Task SignOut()
        {
            if(Preferences.ContainsKey(nameof(App.UserInfo)))
            {
                Preferences.Remove(nameof(App.UserInfo));   
            }

            await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");
        }
    }
}
