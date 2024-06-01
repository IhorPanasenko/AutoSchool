using Auto.School.Mobile.ViewModels.Instructor;

namespace Auto.School.Mobile.Views.Instructor;

public partial class InstructorInstructorDetailsPage : ContentPage
{
	public InstructorInstructorDetailsPage(InstructorInstructorDetailsViewModel instructorInstructorDetailsViewModel)
	{
		InitializeComponent();
		BindingContext = instructorInstructorDetailsViewModel;
	}
}