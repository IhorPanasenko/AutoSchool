using Auto.School.Mobile.ViewModels;

namespace Auto.School.Mobile.Views;

public partial class StudentMyLessonsPage : ContentPage
{
	public StudentMyLessonsPage(StudentMyLessonsViewModel studentMyLessonsViewModel)
	{
		InitializeComponent();
		BindingContext = studentMyLessonsViewModel;
	}
}