using Auto.School.Mobile.ViewModels;

namespace Auto.School.Mobile.Views;

public partial class RegistrationPage : ContentPage
{
	public RegistrationPage()
	{
		InitializeComponent();
		BindingContext = new RegistrationViewModel();
	}
}