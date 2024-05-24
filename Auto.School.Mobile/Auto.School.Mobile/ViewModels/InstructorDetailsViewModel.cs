using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class InstructorDetailsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;
        private readonly IStudentService _studentService;

        public InstructorDetailsViewModel(IInstructorService instructorService, ISharedService sharedService, IStudentService studentService)
        {
            _instructorService = instructorService;
            _sharedService = sharedService;
            LoadInstructor();
            _studentService = studentService;
        }

        private void LoadInstructor()
        {
            Instructor = _sharedService.GetValue<InstructorModel>("instructor")!;
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
        public async Task ShowCarReviews()
        {

        }

        [RelayCommand]
        public async Task ShowInstructorReviews()
        {

        }
    }
}
