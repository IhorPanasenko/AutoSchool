using Auto.School.Mobile.Views;
using Auto.School.Mobile.Services;
using CommunityToolkit.Mvvm.ComponentModel;
using Newtonsoft.Json;
using System.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Auto.School.Mobile.UserControl;

namespace Auto.School.Mobile.ViewModels
{
    public partial class LoginViewModel : BaseViewModel, INotifyPropertyChanged
    {
        [ObservableProperty]
        private string userName = string.Empty;

        [ObservableProperty]
        private string password = string.Empty;

        private readonly ILoginRepository _loginRepository = new LoginService();

        [RelayCommand]
        public async Task Login()
        {
            if (!string.IsNullOrEmpty(UserName) && !string.IsNullOrEmpty(Password))
            {
                var userInfo = await _loginRepository.Login(UserName, Password);

                if (Preferences.ContainsKey(nameof(App.UserInfo)))
                {
                    Preferences.Remove(nameof(App.UserInfo));
                }

                string userDetails= JsonConvert.SerializeObject(userInfo);
                Preferences.Set(nameof(App.UserInfo), userDetails);
                App.UserInfo=userInfo;

                AppShell.Current.FlyoutHeader = new FlyoutHeaderControl();

                await Shell.Current.GoToAsync($"//{nameof(HomePage)}");
            }
        }

        [RelayCommand]
        public async Task GoToRegistration()
        {
            //await Shell.Current.GoToAsync($"//{nameof(RegistrationPage)}");
            await Shell.Current.Navigation.PushAsync(new RegistrationPage(new RegistrationViewModel()));
        }
    }
}
