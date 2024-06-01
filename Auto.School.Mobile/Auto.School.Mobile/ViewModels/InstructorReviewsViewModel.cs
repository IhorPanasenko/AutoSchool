using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Auth.Login;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;
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
            var isSignedUpToInstructor = (bool)_sharedService.GetValue<object>("IsSignedUpToInstructor")!;

            if(instructorId is null)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedGetInstructorId;
                return;
            }

            var response =await _reviewService.GetInstructorReviews(instructorId);
            if(string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
            {
                Reviews = response.Data?.Reviews ?? new List<ReviewModel>();
                Reviews = Reviews.OrderByDescending(r => r.CreatedAt).ToList();
            }

            if (isSignedUpToInstructor)
            {
                string? userInfoJson = Preferences.Get("UserInfo", null);

                if (!string.IsNullOrEmpty(userInfoJson))
                {
                    var userLoginInfo = JsonConvert.DeserializeObject<LoginResponseData>(userInfoJson);
                    IsMyReviewExists = Reviews.Any(r => r.StudentId.Id == userLoginInfo?.UserData.Id);
                }  
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

        [ObservableProperty]
        private bool isMyReviewExists;

        [RelayCommand]
        public void DeleteMyReview()
        {
            
        }
    }
}
