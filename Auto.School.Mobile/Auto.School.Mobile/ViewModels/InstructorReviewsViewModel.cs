using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using System.ComponentModel;


namespace Auto.School.Mobile.ViewModels
{
    public partial class InstructorReviewsViewMode : BaseViewModel, INotifyPropertyChanged
    {
        private readonly ISharedService _sharedService;
        private readonly IReviewService _reviewService;

        public InstructorReviewsViewMode(IReviewService reviewService, ISharedService sharedService)
        {
            _sharedService = sharedService;
            _reviewService = reviewService;
            _ = LoadReviews();
        }

        private async Task LoadReviews()
        {
            var instructorId = _sharedService.GetValue<string>("InstructorId");

            if(instructorId is null)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedGetInstructorId;
                return;
            }

            var response =await _reviewService.GetInstructorReviews(instructorId);
            if(string.Compare(response.Status, ResponseStatuses.Sucess) == 0)
            {
                Reviews = response.Reviews;
            }
        }

        [ObservableProperty]
        private Popup popUpInstance;

        [ObservableProperty]
        private List<ReviewModel> reviews;

        [ObservableProperty]
        private bool isError;

        [ObservableProperty]
        private string errorMessage;
    }
}
