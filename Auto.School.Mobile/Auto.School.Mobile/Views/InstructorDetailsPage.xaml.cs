using Auto.School.Mobile.ViewModels;

namespace Auto.School.Mobile.Views;

public partial class InstructorDetailsPage : ContentPage
{
	public InstructorDetailsPage(InstructorDetailsViewModel instructorDetailsViewModel)
	{
		InitializeComponent();
		BindingContext = instructorDetailsViewModel;
	}
}