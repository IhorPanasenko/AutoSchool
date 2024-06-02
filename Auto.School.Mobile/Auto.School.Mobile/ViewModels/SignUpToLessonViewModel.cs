using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class SignUpToLessonViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly ILessonService _lessonService;
        private readonly ISharedService _sharedService;
        private readonly IPopupService _popupService;
        public SignUpToLessonViewModel(ILessonService lessonService, ISharedService sharedService, IPopupService popupService, IModifyCultureService modifyCultureService) : base(modifyCultureService)
        {
            _lessonService = lessonService;
            _sharedService = sharedService;
            _popupService = popupService;
            GetLesson();
        }

        private void GetLesson()
        {
            var lesson = _sharedService.GetValue<LessonModel>("SignUpLesson");
            if(lesson is not null)
            {
                Lesson = lesson;
            }
        }

        [ObservableProperty]
        private Popup popupInstance;

        [ObservableProperty]
        private LessonModel lesson;

        [ObservableProperty]
        private bool isError;

        [ObservableProperty]
        private string errorMessage;

        [RelayCommand]
        public async Task SignUp()
        {
            var res = await _lessonService.SignUpToLessonAsync(Lesson.Id);

            if (string.Compare(res.Status, ResponseStatuses.Sucess, true) == 0)
            {
                IsError = false;
                Lesson.IsAvailable = false;
                _sharedService.Add("SignUpLesson", Lesson);
                _popupService.ClosePopup(PopupInstance);
            }
            else
            {
                _sharedService.Add<LessonModel>("SignUpLesson", new LessonModel());
                IsError = true;
                ErrorMessage = res.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
            }
        }
    }
}
