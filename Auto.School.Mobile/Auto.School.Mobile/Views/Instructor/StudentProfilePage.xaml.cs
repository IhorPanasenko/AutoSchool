using Auto.School.Mobile.ViewModels.Instructor;
namespace Auto.School.Mobile.Views.Instructor;

public partial class StudentProfilePage : ContentPage
{
	public StudentProfilePage(InstructorStudentProfileViewModel instructorStudentProfileViewModel)
	{
		InitializeComponent();
		BindingContext = instructorStudentProfileViewModel;
	}
}