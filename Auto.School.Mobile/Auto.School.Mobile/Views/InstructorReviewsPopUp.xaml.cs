using Auto.School.Mobile.ViewModels;
using CommunityToolkit.Maui.Views;

namespace Auto.School.Mobile.Views;

public partial class InstructorReviewsPopUp : Popup
{
	public InstructorReviewsPopUp(InstructorReviewsViewMode instructorReviewsViewMode)
	{
		InitializeComponent();
		BindingContext = instructorReviewsViewMode;
		instructorReviewsViewMode.PopUpInstance = this;
	}
}