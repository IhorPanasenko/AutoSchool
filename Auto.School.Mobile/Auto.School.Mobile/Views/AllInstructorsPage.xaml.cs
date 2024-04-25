using Auto.School.Mobile.ViewModels;

namespace Auto.School.Mobile.Views;

public partial class AllInstructorsPage : ContentPage
{
	public AllInstructorsPage(AllInstructorsViewModel allInstructorsViewModel)
	{
		InitializeComponent();
		BindingContext = allInstructorsViewModel;
	}
}