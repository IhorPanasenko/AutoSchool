using Auto.School.Mobile.ViewModels.Instructor;

namespace Auto.School.Mobile.Views.Instructor;

public partial class InstructorAllInstructorsPage : ContentPage
{
	public InstructorAllInstructorsPage(InstructorAllInstructorsViewModel allInstructorsViewModel)
	{
		InitializeComponent();
		BindingContext = allInstructorsViewModel;
	}
}