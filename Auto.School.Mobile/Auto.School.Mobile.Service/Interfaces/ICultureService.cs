using System.Globalization;

namespace Auto.School.Mobile.Service.Interfaces
{
    public interface ICultureService
    {
        CultureInfo GetCurrentCulture();
        void SetCurrentCulture(string cultureName);
    }
}
