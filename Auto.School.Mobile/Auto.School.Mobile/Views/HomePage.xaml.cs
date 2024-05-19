using Auto.School.Mobile.ViewModels;

namespace Auto.School.Mobile.Views;

public partial class HomePage : ContentPage
{ 
	public HomePage(HomeViewModel homeViewModel)
	{
		InitializeComponent();
		BindingContext = homeViewModel;
	}
}