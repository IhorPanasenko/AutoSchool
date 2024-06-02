using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using System.Globalization;

namespace Auto.School.Mobile.Services
{
    public class ModifyCultureService : IModifyCultureService
    {
        public event EventHandler LanguageChanged;

        public void SetCulture(string language)
        {
            CultureInfo culture = language switch
            {
                LocalesConstants.EnglishLanguage => new CultureInfo(LocalesConstants.English),
                LocalesConstants.UkraininaLanguage => new CultureInfo(LocalesConstants.Ukraine),
                _ => throw new ArgumentException("Unsupported language", nameof(language))
            };

            Thread.CurrentThread.CurrentCulture = culture;
            Thread.CurrentThread.CurrentUICulture = culture;

            Preferences.Set("AppLanguage", language);

            // Notify all listeners about the language change
            LanguageChanged?.Invoke(this, EventArgs.Empty);
        }
    }
}
