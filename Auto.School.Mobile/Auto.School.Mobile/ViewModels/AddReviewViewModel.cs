using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;


namespace Auto.School.Mobile.ViewModels
{
    public partial class AddReviewViewModel(IReviewService reviewService, ISharedService sharedService, IPopupService popupService) : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IReviewService _reviewService = reviewService;
        private readonly ISharedService _sharedService = sharedService;
        private readonly IPopupService _popUpservice = popupService;

        [ObservableProperty]
        private Popup popupInstance;

        [ObservableProperty]
        private string review;

        [ObservableProperty]
        private int rating;

        [ObservableProperty]
        private bool isError;

        [ObservableProperty]
        private string errorMessage;

        [RelayCommand]
        public async Task AddReview()
        {
            var instructorId = _sharedService.GetValue<string>("InstructorId");
            if (instructorId == null)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedGetInstructorId;
                return;
            }
            var request = new AddReviewModel { Raiting = Rating, Review = Review };
            var response = await _reviewService.AddReview(request, instructorId);
            if(string.Compare(response.Status, ResponseStatuses.Sucess) != 0)
            {
                IsError = true;
                ErrorMessage = response.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                return;
            }

            _popUpservice.ClosePopup(PopupInstance);
        }

    }
}
