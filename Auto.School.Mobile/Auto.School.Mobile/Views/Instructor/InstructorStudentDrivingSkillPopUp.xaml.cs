using Auto.School.Mobile.ViewModels.Instructor;
using CommunityToolkit.Maui.Views;

namespace Auto.School.Mobile.Views.Instructor;

public partial class InstructorStudentDrivingSkillPopUp : Popup
{
	public InstructorStudentDrivingSkillPopUp(InstructorStudentDrivingSkillViewModel instructorStudentDrivingSkillViewModel)
	{
		InitializeComponent();
		BindingContext = instructorStudentDrivingSkillViewModel;
		instructorStudentDrivingSkillViewModel.PopupInstance = this;
	}
}