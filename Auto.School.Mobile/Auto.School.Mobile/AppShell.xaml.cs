using Auto.School.Mobile.Pages;
using Auto.School.Mobile.ViewModels;

namespace Auto.School.Mobile
{
    public partial class AppShell : Shell
    {
        public AppShell()
        {
            InitializeComponent();
            BindingContext = new AppShellViewModel();
            Routing.RegisterRoute(nameof(HomePage), typeof(HomePage));
        }
    }
}
