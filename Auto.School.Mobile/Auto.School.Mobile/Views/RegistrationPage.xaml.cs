using Auto.School.Mobile.ViewModels;
namespace Auto.School.Mobile.Views;

public partial class RegistrationPage : ContentPage
{
    public RegistrationPage(RegistrationViewModel registrationViewModel)
	{
        BindingContext = registrationViewModel;
        InitializeComponent();
    }

    protected override void OnAppearing()
    {
        base.OnAppearing();
        Shell.SetNavBarIsVisible(this, false);
        Shell.SetTabBarIsVisible(this, false);
    }

    protected override void OnDisappearing()
    {
        base.OnDisappearing();
        Shell.SetNavBarIsVisible(this, true);
        Shell.SetTabBarIsVisible(this, true);
    }
}