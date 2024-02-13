using Auto.School.Mobile.Models;
using Auto.School.Mobile.Pages;

namespace Auto.School.Mobile
{
    public partial class App : Application
    {
        public static UserInfo UserInfo;
        public App()
        {
            InitializeComponent();

            MainPage = new AppShell();
        }
    }
}
