using Auto.School.Mobile.ViewModels.Instructor;
namespace Auto.School.Mobile.Views.Instructor;

public partial class InstructorProfilePage : ContentPage
{
	public InstructorProfilePage(InstructorProfielViewModel instructorProfielViewModel)
	{
		InitializeComponent();
		BindingContext = instructorProfielViewModel;
	}
}