using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Lesson.StudentGetMy;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class StudentMyLessonsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly ILessonService _lessonService;

        public StudentMyLessonsViewModel(ILessonService lessonService)
        {
            _lessonService = lessonService;
            _ = GetMyLessons();
            IsLoading = false;
        }

        private async Task GetMyLessons()
        {
            var res = await _lessonService.StudentGetMyLessonsAsync();

            if (string.Compare(res.Status, ResponseStatuses.Fail) == 0) 
            { 
                IsError = true;
                ErrorMessage = res.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
            }

            Lessons = res.StudentLessons;
            var now = DateTime.Now;
            PassedLessons = Lessons.Where(l => l.Date.DayOfYear < now.DayOfYear || (l.Date.DayOfYear == now.DayOfYear && TimeToInt(l.ToHour) <= now.Hour )).ToList();
            FutureLessons = Lessons.Where(l => l.Date.DayOfYear > now.DayOfYear || (l.Date.DayOfYear == now.DayOfYear && TimeToInt(l.ToHour) > now.Hour)).ToList();
        }

        private int TimeToInt(string time)
        {
            string[] timeParts = time.Split(':');
            int hour = int.Parse(timeParts[0]);
            return hour;
        }

        [ObservableProperty]
        private bool isLoading;

        [ObservableProperty]
        private bool isError;

        [ObservableProperty]
        private string errorMessage;

        [ObservableProperty]
        private List<StudentLessonModel> lessons;

        [ObservableProperty]
        private List<StudentLessonModel> passedLessons;

        [ObservableProperty]
        private List<StudentLessonModel> futureLessons;
    }
}
