using Auto.School.Mobile.ViewModels;
using CommunityToolkit.Maui.Views;

namespace Auto.School.Mobile.Views;

public partial class StudentAddInstructorReviewPopUp : Popup
{
    public StudentAddInstructorReviewPopUp(AddReviewViewModel addReviewViewModel)
    {
        //InitializeComponent();
        BindingContext = addReviewViewModel;
        addReviewViewModel.PopupInstance = this;
    }
}