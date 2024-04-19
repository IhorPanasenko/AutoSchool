using Auto.School.Mobile.Core.Models;

namespace Auto.School.Mobile
{
    public partial class App : Application
    {
        public static UserDataModel? UserInfo { get; set; }

        public App()
        {
            InitializeComponent();
            MainPage = new AppShell();
        }


#if WINDOWS
        protected override Window CreateWindow(IActivationState activationState)
        {
            var window = base.CreateWindow(activationState);
            var displayWidth = DeviceDisplay.Current.MainDisplayInfo.Width;
            var displayHeight = DeviceDisplay.Current.MainDisplayInfo.Height;
            window.Width = displayWidth / 4;
            window.Height = displayHeight - 350;
            window.X = displayWidth / 4;
            window.Y = 20;

            return window;
        }
#endif
    }
}
