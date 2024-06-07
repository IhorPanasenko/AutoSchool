using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Extension;
using System.Globalization;

namespace Auto.School.Mobile.UserControl;

public partial class FlyoutHeaderControl : ContentView
{
    private bool isInitializing;
    private string currentLanguage;

    public FlyoutHeaderControl()
    {
        InitializeComponent();

        if (App.UserInfo is not null)
        {
            lblUserName.Text = App.UserInfo.Name;
            lblUserEmail.Text = App.UserInfo.Surname;
        }

        isInitializing = true;
        var savedLanguage = Preferences.Get("AppLanguage", LocalesConstants.English);
        currentLanguage = savedLanguage;
        if (currentLanguage == LocalesConstants.Ukraine)
        {
            languagePicker.ItemsSource = new List<string> { LocalesConstants.EnglishLanguageUa, LocalesConstants.UkraininaLanguageUa };
        }
        else
        {
            languagePicker.ItemsSource = new List<string> { LocalesConstants.EnglishLanguage, LocalesConstants.UkraininaLanguage };
        }
        languagePicker.SelectedIndex = currentLanguage == LocalesConstants.English ? 0 : 1;
        isInitializing = false;
    }

    private void OnLanguageSelected(object sender, EventArgs e)
    {
        if (isInitializing || languagePicker.SelectedIndex == -1)
        {
            return;
        }

        string selectedLanguage = languagePicker.SelectedIndex == 0 ? LocalesConstants.English : LocalesConstants.Ukraine;
        if (selectedLanguage != currentLanguage)
        {
            currentLanguage = selectedLanguage;
            Preferences.Set("AppLanguage", currentLanguage);

            var culture = new CultureInfo(selectedLanguage);
            CultureInfo.CurrentCulture = culture;
            CultureInfo.CurrentUICulture = culture;
            Translator.Instance.CultureInfo = culture;

            isInitializing = true;
            if (currentLanguage == LocalesConstants.Ukraine)
            {
                languagePicker.ItemsSource.Clear();
                languagePicker.ItemsSource.Add(LocalesConstants.EnglishLanguageUa);
                languagePicker.ItemsSource.Add(LocalesConstants.UkraininaLanguageUa);
                //languagePicker.ItemsSource[0] = LocalesConstants.EnglishLanguageUa;
                //languagePicker.ItemsSource[1] = LocalesConstants.UkraininaLanguageUa;
            }
            else
            {
                languagePicker.ItemsSource.Clear();
                languagePicker.ItemsSource.Add(LocalesConstants.EnglishLanguage);
                languagePicker.ItemsSource.Add(LocalesConstants.UkraininaLanguage);
                //languagePicker.ItemsSource[0] = LocalesConstants.EnglishLanguage;
                //languagePicker.ItemsSource[1] = LocalesConstants.UkraininaLanguage;
            }

            isInitializing = false;

            Translator.Instance.OnPropertyChanged();
        }
    }
}