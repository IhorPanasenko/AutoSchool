using Auto.School.Mobile.ViewModels;
using Auto.School.Mobile.Views;

namespace Auto.School.Mobile
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            BindingContext = new AppShellViewModel();
            Routing.RegisterRoute(nameof(HomePage), typeof(HomePage));
            Routing.RegisterRoute(nameof(RegistrationPage), typeof(RegistrationPage));
            Routing.RegisterRoute(nameof(StudentProfile), typeof(StudentProfile));
        }
    }
}
