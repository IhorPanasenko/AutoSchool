using Auto.School.Mobile.ViewModels;
namespace Auto.School.Mobile.Views.Instructor;

public partial class InstructorProfilePage : ContentPage
{
	public InstructorProfilePage(InstructorProfielViewModel instructorProfielViewModel)
	{
		InitializeComponent();
		BindingContext = instructorProfielViewModel;
	}
}