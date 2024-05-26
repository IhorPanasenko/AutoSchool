using Auto.School.Mobile.ViewModels;
namespace Auto.School.Mobile.Views;

public partial class InstructorScheduleStudentPage : ContentPage
{
	public InstructorScheduleStudentPage(InstructorScheduleStudentViewModel instructorScheduleStudentViewModel)
	{
		InitializeComponent();
		BindingContext = instructorScheduleStudentViewModel;
	}
}