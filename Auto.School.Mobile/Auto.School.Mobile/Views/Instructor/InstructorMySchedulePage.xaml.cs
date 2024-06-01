using Auto.School.Mobile.ViewModels.Instructor;

namespace Auto.School.Mobile.Views.Instructor;

public partial class InstructorMySchedulePage : ContentPage
{
	public InstructorMySchedulePage(InstructorMyScheduleViewModel instructorMyScheduleViewModel)
	{
		InitializeComponent();
		BindingContext = instructorMyScheduleViewModel;
	}
}