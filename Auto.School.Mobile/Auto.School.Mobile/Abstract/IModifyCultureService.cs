namespace Auto.School.Mobile.Abstract
{
    public interface IModifyCultureService
    {
        void SetCulture(string language);
        event EventHandler LanguageChanged;
    }
}
