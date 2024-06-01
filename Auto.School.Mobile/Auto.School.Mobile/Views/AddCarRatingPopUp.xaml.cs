using Auto.School.Mobile.ViewModels;
using CommunityToolkit.Maui.Views;

namespace Auto.School.Mobile.Views;

public partial class AddCarRatingPopUp : Popup
{
	public AddCarRatingPopUp(AddCarRatingViewModel addCarRatingViewModel)
	{
        InitializeComponent();
        BindingContext =addCarRatingViewModel;
        addCarRatingViewModel.PopupInstance = this;

    }
}