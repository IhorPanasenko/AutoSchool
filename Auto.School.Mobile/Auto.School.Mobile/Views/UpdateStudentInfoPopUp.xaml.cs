using Auto.School.Mobile.ViewModels;
using CommunityToolkit.Maui.Views;
namespace Auto.School.Mobile.Views;

public partial class UpdateStudentInfoPopUp : Popup
{
	public UpdateStudentInfoPopUp(UpdateStudentInfoViewModel updateStudentInfoViewModel)
	{
		InitializeComponent();
		BindingContext = updateStudentInfoViewModel;
		updateStudentInfoViewModel.PopupInstance = this;
	}
}