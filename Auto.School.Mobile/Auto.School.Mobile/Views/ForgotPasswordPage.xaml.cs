using Auto.School.Mobile.ViewModels;

namespace Auto.School.Mobile.Views;

public partial class ForgotPasswordPage : ContentPage
{
	public ForgotPasswordPage(ForgotPasswordViewModel forgotPasswordViewModel)
	{
		InitializeComponent();
		BindingContext = forgotPasswordViewModel;
	}
}