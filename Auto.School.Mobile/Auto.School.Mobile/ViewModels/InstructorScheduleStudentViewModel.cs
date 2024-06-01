using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;
using Auto.School.Mobile.Core.Extensions;
using Auto.School.Mobile.Views;
using Newtonsoft.Json;

namespace Auto.School.Mobile.ViewModels
{
    public partial class InstructorScheduleStudentViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly IStudentService _studentService;
        private readonly ISharedService _sharedService;
        private DateTime _currentWeekStart;
        private readonly IPopupService _popupService;

        public InstructorScheduleStudentViewModel(IInstructorService instructorService, ISharedService sharedService, IPopupService popupService)
        {
            _instructorService = instructorService;
            _sharedService = sharedService;
            CloseAction = CloseActionMethod;
            _currentWeekStart = DateTime.Now.StartOfWeek(DayOfWeek.Monday);
            _popupService = popupService;
            _ = LoadLessons();
            _ = LoadInstructor();
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
            var instructorId = _sharedService.GetValue<string>("InstructorId");

            if (instructorId is null)
            {
                string instructorIdJson = Preferences.Get("InstructorId", string.Empty);
                if (!string.IsNullOrEmpty(instructorIdJson))
                {
                    instructorId = JsonConvert.DeserializeObject<string>(instructorIdJson);
                    
                }
            }

            if (instructorId is null)
            {
                IsLoading = false;
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedLoadSchedule;
                IsLoading = false;
                return;
            }

            var response = await _instructorService.GetSchedule(instructorId);

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

        private async Task LoadInstructor()
        {
            var instructorId = _sharedService.GetValue<string>("InstructorId");

            if (instructorId is null)
            {
                string instructorIdJson = Preferences.Get("InstructorId", string.Empty);
                if (!string.IsNullOrEmpty(instructorIdJson))
                {
                    instructorId = JsonConvert.DeserializeObject<string>(instructorIdJson);
                }
            }

            var response = await _instructorService.GetOne(instructorId!);

            if (response is null || string.Compare(response.Status, ResponseStatuses.Fail, true) == 0)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedToLoadInstuctor;
                return;
            }

            IsError = false;
            Instructor = response.Instructor;
        }

        [RelayCommand]
        public async Task SelectDate(DateTime date)
        {
            SelectedDay = date;
            SelectedDayLessons = Lessons.Where(l => l.Date == SelectedDay).OrderByDescending(l => TimeSpan.Parse(l.FromHour)).ToList();
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
            SelectedDayLessons = Lessons.Where(l => l.Date.Date == SelectedDay.Date).OrderByDescending(l => TimeSpan.Parse(l.FromHour)).ToList();
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
            SelectedDayLessons = Lessons.Where(l => l.Date == SelectedDay).OrderByDescending(l => TimeSpan.Parse(l.FromHour)).ToList();
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
        public async Task ShowLessonDetails(LessonModel lesson)
        {
            if (lesson == null)
            {
                return;
            }

            _sharedService.Add("SignUpLesson", lesson);
            await _popupService.ShowPopupAsync<SignUpToLessonPopUp>();
            UpdateLessonsAfterSignUp();
        }

        private void UpdateLessonsAfterSignUp()
        {
            var updatedLesson = _sharedService.GetValue<LessonModel>("SignUpLesson");

            if (updatedLesson is null || string.IsNullOrEmpty(updatedLesson.Id))
            {
                return;
            }

            Lessons.FirstOrDefault(l => l.Id == updatedLesson.Id)!.IsAvailable = false;
        }
    }
}
