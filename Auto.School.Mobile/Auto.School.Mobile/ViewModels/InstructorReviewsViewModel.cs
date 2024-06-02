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
        private readonly IStudentService _studentService;

        public InstructorReviewsViewMode(IReviewService reviewService, ISharedService sharedService, IStudentService studentService, IModifyCultureService modifyCultureService) : base(modifyCultureService)
        {
            _sharedService = sharedService;
            _reviewService = reviewService; 
            _studentService = studentService;
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

            this.instructorId = instructorId;
            var response =await _reviewService.GetInstructorReviews(instructorId);
            if(string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
            {
                Reviews = response.Data?.Reviews ?? new List<ReviewModel>();
                Reviews = Reviews.OrderByDescending(r => r.CreatedAt).ToList();
            }

            if (isSignedUpToInstructor)
            {
                var myInfo = await _studentService.GetInfoMe();
                if (myInfo is not null)
                {
                    MyReview = Reviews.FirstOrDefault(r => r.StudentId.Id == myInfo.Data.Student.Id);
                    if(MyReview is not null)
                    {
                        Reviews.Remove(MyReview);
                        IsMyReviewExists = true;
                    }
                }  
            }
        }

        [ObservableProperty]
        private Popup popUpInstance;

        [ObservableProperty]
        private List<ReviewModel> reviews;

        [ObservableProperty]
        private ReviewModel? myReview;

        [ObservableProperty]
        private bool isError;

        [ObservableProperty]
        private string errorMessage;

        [ObservableProperty]
        private bool isMyReviewExists;

        private string instructorId;

        [RelayCommand]
        public async Task DeleteMyReview()
        {
            if (MyReview is not null)
            {
                var response = await _reviewService.DeleteReview(instructorId, MyReview.Id);
                if(string.Compare(response.Status, ResponseStatuses.Sucess) == 0)
                {
                    IsMyReviewExists = false;
                    MyReview = null;
                }
            }
        }
    }
}
