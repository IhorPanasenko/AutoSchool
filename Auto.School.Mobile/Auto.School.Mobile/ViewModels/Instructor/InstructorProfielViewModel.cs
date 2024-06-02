using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels.Instructor
{
    public partial class InstructorProfielViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;
        private readonly IStudentService _studentService;
        private readonly IPopupService _popupService;

        public InstructorProfielViewModel(IInstructorService instructorService, IPopupService popupService, IReviewService reviewService, ISharedService sharedService)
        {
            _instructorService = instructorService;
            _sharedService = sharedService;
            _popupService = popupService;
            _ = LoadInstructor();
        }
        private async Task LoadInstructor()
        {
            var response = await _instructorService.GetInfoMe();
            if(string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
            {
                Instructor = response.Instructor;   
            }
            else
            {
                IsError = true;
                ErrorMessage = response.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
            }

            IsLoading = false;
        }

        [ObservableProperty]
        private InstructorModel instructor;

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
        public async Task ShowInstructorReviews()
        {
            _sharedService.Add("InstructorId", Instructor.Id);
            _sharedService.Add("IsSignedUpToInstructor", (object)false);
            await _popupService.ShowPopupAsync<InstructorReviewsPopUp>();

        }
    }
}
