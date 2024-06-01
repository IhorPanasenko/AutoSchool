using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Extensions;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels.Instructor
{
    public partial class InstructorMyScheduleViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly IStudentService _studentService;
        private readonly ISharedService _sharedService;
        private readonly ILessonService _lessonService;
        private DateTime _currentWeekStart;
        private readonly IPopupService _popupService;

        public InstructorMyScheduleViewModel(IInstructorService instructorService, ISharedService sharedService, IPopupService popupService, ILessonService lessonService)
        {
            _instructorService = instructorService;
            _sharedService = sharedService;
            CloseAction = CloseActionMethod;
            _currentWeekStart = DateTime.Now.StartOfWeek(DayOfWeek.Monday);
            _popupService = popupService;
            _lessonService = lessonService;
            _ = LoadLessons();
            IsLoading = false;   
        }

        [ObservableProperty]
        private List<LessonModel> lessons;

        [ObservableProperty]
        private List<DateTime> weekDays;

        [ObservableProperty]
        private DateTime selectedDay;

        [ObservableProperty]
        private List<LessonModel> selectedDayLessons;

        private async Task LoadLessons()
        {
            var responseMe = await _instructorService.GetInfoMe();

            if (responseMe is null || string.Compare(responseMe.Status, ResponseStatuses.Fail, true) == 0)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedToLoadInstuctor;
                return;
            }

            IsError = false;
            Instructor = responseMe.Instructor;

            var response = await _instructorService.GetSchedule(Instructor.Id);

            if (string.Compare(response.Status, ResponseStatuses.Fail) == 0)
            {
                IsLoading = false;
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedLoadSchedule;
                IsLoading = false;
                return;
            }

            Lessons = response.Lessons;
            WeekDays = GetWeekDays();
            SelectedDay = DateTime.Today;
            UpdateSelectedDayLessons();
        }

        [RelayCommand]
        public async Task SelectDate(DateTime date)
        {
            SelectedDay = date;
            SelectedDayLessons = Lessons.Where(l => l.Date == SelectedDay).OrderBy(l => TimeSpan.Parse(l.FromHour)).ToList();
        }

        private List<DateTime> GetWeekDays()
        {
            var startOfWeek = DateTime.Today.StartOfWeek(DayOfWeek.Monday);
            return Enumerable.Range(0, 5).Select(offset => startOfWeek.AddDays(offset)).ToList();
        }

        partial void OnSelectedDayChanged(DateTime value)
        {
            UpdateSelectedDayLessons();
        }

        private void UpdateSelectedDayLessons()
        {
            SelectedDayLessons = Lessons.Where(l => l.Date.Date == SelectedDay.Date).OrderBy(l => TimeSpan.Parse(l.FromHour)).ToList();
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
            WeekDays = WeekDays.Select(d => d.AddDays(-7)).ToList();
            SelectedDay = WeekDays.First();
        }

        [RelayCommand]
        public void LoadNextWeek()
        {
            WeekDays = WeekDays.Select(d => d.AddDays(7)).ToList();
            SelectedDay = WeekDays.First();
            SelectedDayLessons = Lessons.Where(l => l.Date == SelectedDay).OrderBy(l => TimeSpan.Parse(l.FromHour)).ToList();
        }

        [RelayCommand]
        public async Task OpenStudentProfile(LessonModel lesson)
        {

        }

        [RelayCommand]
        public async Task CancelLesson(LessonModel lesson)
        {
            var res = await _lessonService.CancelMyLesson(lesson.Id);

            if(string.Compare(res.Status, ResponseStatuses.Sucess, true) == 0)
            {
                await LoadLessons();
            }
        }
    }
}
