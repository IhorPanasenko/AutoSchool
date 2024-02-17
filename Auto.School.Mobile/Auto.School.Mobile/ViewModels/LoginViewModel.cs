using Auto.School.Mobile.Pages;
using Auto.School.Mobile.Services;
using CommunityToolkit.Mvvm.ComponentModel;
using Newtonsoft.Json;
using Microsoft.Maui.Controls;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;
using Auto.School.Mobile.Models;
using CommunityToolkit.Mvvm.Input;
using Auto.School.Mobile.UserControl;

namespace Auto.School.Mobile.ViewModels
{
    public partial class LoginViewModel : BaseViewModel, INotifyPropertyChanged
    {
        [ObservableProperty]
        private string _userName = string.Empty;

        [ObservableProperty]
        private string _password = string.Empty;

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
    }
}
