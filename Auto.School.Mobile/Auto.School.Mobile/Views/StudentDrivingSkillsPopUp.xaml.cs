using Auto.School.Mobile.ViewModels;
using CommunityToolkit.Maui.Views;

namespace Auto.School.Mobile.Views;

public partial class StudentDrivingSkillsPopUp : Popup
{
	public StudentDrivingSkillsPopUp(StudentDrivingSkilllsViewModel studentDrivingSkilllsViewModel)
	{
		InitializeComponent();
		BindingContext = studentDrivingSkilllsViewModel;
		studentDrivingSkilllsViewModel.PopupInstance = this;
	}
}