using Auto.School.Mobile.ViewModels;
using System.ComponentModel;

namespace Auto.School.Mobile.Views
{

    public partial class LoginPage : ContentPage
    {
        public LoginPage(LoginViewModel loginViewModel)
        {
            InitializeComponent();
            BindingContext = loginViewModel;
        }
    }
}