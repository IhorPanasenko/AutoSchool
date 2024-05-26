using Auto.School.Mobile.Service.Interfaces;
using System.Globalization;

namespace Auto.School.Mobile.Service.Services
{
    public class CultureService : ICultureService
    {
        public CultureInfo GetCurrentCulture()
        {
            return CultureInfo.CurrentCulture;
        }

        public void SetCurrentCulture(string cultureName)
        {
            var culture = new CultureInfo(cultureName);
            CultureInfo.CurrentCulture = culture;
            CultureInfo.CurrentUICulture = culture;
        }
    }
}
