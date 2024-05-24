using CommunityToolkit.Maui.Views;

namespace Auto.School.Mobile.Views;

public partial class SignUpToLessonPopUp : Popup
{
	public SignUpToLessonPopUp(SignUpToLessonPopUp signUpToLessonPopUp)
	{
		InitializeComponent();
		BindingContext = signUpToLessonPopUp;
		signUpToLessonPopUp.PopupInstance = this;
	}
}