using Auto.School.Mobile.ViewModels;

namespace Auto.School.Mobile.Views;

public partial class StudentProfile : ContentPage
{
	public StudentProfile(StudentProfileViewModel studentProfileViewModel)
	{
		InitializeComponent();
		BindingContext = studentProfileViewModel;
	}
}