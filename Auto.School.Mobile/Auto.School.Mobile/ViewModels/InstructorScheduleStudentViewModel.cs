using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class InstructorScheduleStudentViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;

        public InstructorScheduleStudentViewModel(IInstructorService instructorService, ISharedService sharedService)
        {
            _instructorService = instructorService;
            _sharedService = sharedService;
            CloseAction = CloseActionMethod;
            _ = LoadLessons();
        }

        [ObservableProperty]
        private List<LessonModel> lessons;

        private async Task LoadLessons()
        {
            var instructorId = _sharedService.GetValue<string>("InstrctorId");
            if (instructorId is null)
            {
                IsLoading = false;
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedLoadSchedule;
                return;
            }

            var response = await _instructorService.GetSchedule(instructorId);

            if (string.Compare(response.Status, ResponseStatuses.Fail) == 0)
            {
                IsLoading = false;
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedLoadSchedule;
                return;
            }

            Lessons = response.Lessons;
        }

        [ObservableProperty]
        private bool isLoading = true;

        [ObservableProperty]
        private bool isError = false;

        [ObservableProperty]
        private string errorMessage;

        public void CloseActionMethod()
        {
            IsError = false;
            ErrorMessage = string.Empty;
        }

        public Action CloseAction { get; set; }

        [RelayCommand]
        public void SignUp(LessonModel lesson)
        {

        }
    }
}
