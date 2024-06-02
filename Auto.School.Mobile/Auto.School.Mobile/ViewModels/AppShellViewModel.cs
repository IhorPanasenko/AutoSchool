using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.Input;

namespace Auto.School.Mobile.ViewModels
{
    public partial class AppShellViewModel : BaseViewModel
    {
        private readonly IAuthenticationService _authenticationService;
        public AppShellViewModel(IAuthenticationService authenticationService, IModifyCultureService modifyCultureService) : base(modifyCultureService)
        {
            _authenticationService = authenticationService;
        }

        [RelayCommand]
        public async Task SignOut()
        {
            if (Preferences.ContainsKey(nameof(App.UserInfo)))
            {
                Preferences.Remove(nameof(App.UserInfo));
                Preferences.Remove("UserRole");
            }

            await _authenticationService.Logout();
            await Shell.Current.GoToAsync($"/{nameof(LoginPage)}");
            ((AppShell)Shell.Current).SetFlyoutItems();
        }
    }
}
