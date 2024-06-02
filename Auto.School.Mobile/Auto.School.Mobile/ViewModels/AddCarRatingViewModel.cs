using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class AddCarRatingViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly ICarService _carService;
        private readonly ISharedService _sharedService;
        private readonly IPopupService _popUpservice;

        public AddCarRatingViewModel(ICarService carService, IPopupService popupService, ISharedService sharedService, IModifyCultureService modifyCultureService) : base(modifyCultureService)
        {
            _carService = carService;
            _sharedService = sharedService;
            _popUpservice = popupService;

        }

        [ObservableProperty]
        private Popup popupInstance;

        [ObservableProperty]
        private string review;

        [ObservableProperty]
        private int rating;

        [ObservableProperty]
        private bool isError;

        [ObservableProperty]
        private string errorMessage;

        [ObservableProperty]
        private bool isSuccess;

        [ObservableProperty]
        private string successMessage;

        [ObservableProperty]
        private bool isButtonEnabled = true;

        [RelayCommand]
        public async Task AddReview()
        {
            var carId = _sharedService.GetValue<string>("CarId");
            if (carId == null)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedGetInstructorId;
                return;
            }
            var response = await _carService.AddRating(carId, Rating);
            if (string.Compare(response.Status, ResponseStatuses.Sucess, true) != 0)
            {
                IsError = true;
                ErrorMessage = response.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                return;
            }
            else
            {
                IsSuccess = true;
                SuccessMessage = AppMessages.AddReviewSuccessResult;
                IsButtonEnabled = false;
            }
        }

        [RelayCommand]
        public void ClosePopup()
        {
            _popUpservice.ClosePopup(PopupInstance);
        }

    }
}
