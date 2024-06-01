using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CoreData;
using Newtonsoft.Json;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class InstructorDetailsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;
        private readonly IStudentService _studentService;
        private readonly IPopupService _popupService;

        public InstructorDetailsViewModel(IInstructorService instructorService, ISharedService sharedService, IStudentService studentService, IPopupService popupService)
        {
            _instructorService = instructorService;
            _sharedService = sharedService;
            _studentService = studentService;
            _popupService = popupService;
            SetIsSignedUpToThisInstructor();
            _ = LoadInstructor();
        }

        private void SetIsSignedUpToThisInstructor()
        {
            string instructorIdJson = Preferences.Get("InstructorId", string.Empty);
            if (!string.IsNullOrEmpty(instructorIdJson))
            {
                myInstructorId = JsonConvert.DeserializeObject<string>(instructorIdJson)!;
            }
        }

        private async Task LoadInstructor()
        {
            var sharedInstructor = _sharedService.GetValue<InstructorModel>("instructor");
            if (sharedInstructor is null)
            {
                string instructorIdJson = Preferences.Get("InstructorId", string.Empty);
                if (!string.IsNullOrEmpty(instructorIdJson))
                {
                    var instructorId = JsonConvert.DeserializeObject<string>(instructorIdJson);
                    var dbInstructor = await _instructorService.GetOne(instructorId!);
                    if (dbInstructor is not null)
                    {
                        Instructor = dbInstructor.Instructor;
                    }
                }
            }
            else
            {
                Instructor = sharedInstructor;

            }

            IsSignedUpToThisInstructor = Instructor.Id == myInstructorId;
            IsLoading = false;
        }

        private string? myInstructorId = null;

        [ObservableProperty]
        private InstructorModel instructor;

        [ObservableProperty]
        private bool isSignedUpToThisInstructor = false;

        public bool IsNotSignedUpToThisInstructor { get => !IsSignedUpToThisInstructor; private set { } }

        partial void OnIsSignedUpToThisInstructorChanged(bool value)
        {
            OnPropertyChanged(nameof(IsNotSignedUpToThisInstructor));
        }

        [ObservableProperty]
        private bool isLoading = true;

        [ObservableProperty]
        private bool isError;

        [ObservableProperty]
        private string errorMessage;

        [ObservableProperty]
        private bool isSuccess;

        [ObservableProperty]
        private string successMessage;

        [RelayCommand]
        public async Task SignUpToInstructor()
        {
            var response = await _studentService.ConnectWithInstructor(Instructor.Id);
            if (string.Compare(response.Status, ResponseStatuses.Fail, true) == 0)
            {
                IsError = true;
                ErrorMessage = response.Message ?? response.Error?.Status ?? AppErrorMessagesConstants.FailedToLoadInstuctor;
            }
            else
            {
                IsSuccess = true;
                SuccessMessage = response.Message ?? AppMessages.SignUpToInstructorSuccess;
            }
        }

        [RelayCommand]
        public async Task AddReview()
        {
            _sharedService.Add("InstructorId", Instructor.Id);
            await _popupService.ShowPopupAsync<StudentAddInstructorReviewPopUp>();
        }

        [RelayCommand]
        public async Task ShowInstructorReviews()
        {
            _sharedService.Add("InstructorId", Instructor.Id);
            _sharedService.Add("IsSignedUpToInstructor", (object)IsSignedUpToThisInstructor);
            await _popupService.ShowPopupAsync<InstructorReviewsPopUp>();

        }

        [RelayCommand]
        public async Task AddCarRating()
        {
            _sharedService.Add("CarId", Instructor.Car!.Id);
            await _popupService.ShowPopupAsync<AddCarRatingPopUp>();
        }
    }
}
