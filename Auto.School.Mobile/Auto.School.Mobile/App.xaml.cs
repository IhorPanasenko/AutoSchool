using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Extension;
using System.Globalization;

namespace Auto.School.Mobile
{
    public partial class App : Application
    {
        public static UserDataModel? UserInfo { get; set; }

        public App(AppShell appShell)
        {
            InitializeComponent();
            var savedLanguage = Preferences.Get("AppLanguage", LocalesConstants.English);
            if (savedLanguage != null)
            {
                SetAppLanguage(savedLanguage);
            }
            MainPage = appShell;
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
        private void SetAppLanguage(string language)
        {
            CultureInfo culture = new CultureInfo(language);

            Translator.Instance.CultureInfo = culture;
            CultureInfo.CurrentCulture = culture;
            CultureInfo.CurrentUICulture = culture;
        }
    }
}
