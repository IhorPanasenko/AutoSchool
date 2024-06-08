using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.ApiIntegration.Constants;
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
        public SignUpToLessonViewModel(ILessonService lessonService, ISharedService sharedService, IPopupService popupService)
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

            var paymentUrl = RoutesConstants.PaymentLink + Lesson.Id;

            try
            {
                await Launcher.OpenAsync(new Uri(paymentUrl));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                //await DisplayAlert("Error", $"Unable to open URL: {ex.Message}", "OK");
            }
        }
    }
}
