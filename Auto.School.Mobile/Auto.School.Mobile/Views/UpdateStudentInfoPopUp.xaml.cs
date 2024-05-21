using CommunityToolkit.Maui.Views;
namespace Auto.School.Mobile.Views;

public partial class UpdateStudentInfoPopUp : Popup
{
	public UpdateStudentInfoPopUp(UpdateStudentInfoPopUp updateStudentInfoPopUp)
	{
		InitializeComponent();
		BindingContext = updateStudentInfoPopUp;
	}
}