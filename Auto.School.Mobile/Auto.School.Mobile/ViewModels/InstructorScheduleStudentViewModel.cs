using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;
using System.Globalization;
using Auto.School.Mobile.Core.Extensions;
using Java.Lang.Reflect;

namespace Auto.School.Mobile.ViewModels
{
    public partial class InstructorScheduleStudentViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;
        private DateTime _currentWeekStart;

        public InstructorScheduleStudentViewModel(IInstructorService instructorService, ISharedService sharedService)
        {
            _instructorService = instructorService;
            _sharedService = sharedService;
            CloseAction = CloseActionMethod;
            _currentWeekStart = DateTime.Now.StartOfWeek(DayOfWeek.Monday);
            _ = LoadLessons();
        }

        [ObservableProperty]
        private List<LessonModel> lessons;

        private async Task LoadLessons()
        {
            var instructorId = _sharedService.GetValue<string>("InstructorId");
            if (instructorId is null)
            {
                IsLoading = false;
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedLoadSchedule;
                return;
            }

            await LoadInstructor(instructorId);
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
        private async Task LoadInstructor(string instructorId)
        {
            var response = await _instructorService.GetOne(instructorId);

            if (response is null || string.Compare(response.Status, ResponseStatuses.Fail, true) == 0)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedToLoadInstuctor;
                return;
            }

            IsError = false;
            Instructor = response.Instructor;
        }

        [ObservableProperty]
        private InstructorModel instructor;

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
        public void LoadPreviousWeek()
        {
            _currentWeekStart = _currentWeekStart.AddDays(-7);
            _ = LoadLessons();
        }

        [RelayCommand]
        public void LoadNextWeek()
        {
            _currentWeekStart = _currentWeekStart.AddDays(7);
            _ = LoadLessons();
        }

        [RelayCommand]
        public async Task ViewDetailedInfo()
        {
            try
            {
                if (Instructor == null)
                {
                    return;
                }

                _sharedService.Add("instructor", Instructor);
                await Shell.Current.GoToAsync(nameof(InstructorDetailsPage));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        [RelayCommand]
        public void SignUp(LessonModel lesson)
        {

        }

        private bool IsLessonInCurrentWeek(LessonModel lesson)
        {
            var lessonDate = DateTime.ParseExact(lesson.FromHour, "yyyy-MM-ddTHH:mm:ss", CultureInfo.CurrentCulture);
            return lessonDate >= _currentWeekStart && lessonDate < _currentWeekStart.AddDays(7);
        }

        public List<LessonModel> GetLessonsForDay(DayOfWeek dayOfWeek)
        {
            return Lessons.Where(lesson => lesson.DayOfWeek == dayOfWeek.ToString()).ToList();
        }

    }
}
