using Auto.School.Mobile.ViewModels;
using CommunityToolkit.Maui.Views;
namespace Auto.School.Mobile.Views;

public partial class UpdatePasswordPopUp : Popup
{
	public UpdatePasswordPopUp(UpdatePasswordViewModel updatePasswordViewModel)
	{
		InitializeComponent();
		BindingContext = updatePasswordViewModel;
	}
}