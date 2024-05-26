using Auto.School.Mobile.ViewModels;
using CommunityToolkit.Maui.Views;

namespace Auto.School.Mobile.Views;

public partial class SignUpToLessonPopUp : Popup
{
	public SignUpToLessonPopUp(SignUpToLessonViewModel signUpToLessonViewModel)
	{
		InitializeComponent();
		BindingContext = signUpToLessonViewModel;
		signUpToLessonViewModel.PopupInstance = this;
	}
}