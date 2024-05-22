using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Validators;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;
using System.Text.RegularExpressions;

namespace Auto.School.Mobile.ViewModels
{
    public partial class UpdateStudentInfoViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly ICityService _cityService;
        private readonly IStudentService _studentService;
        private readonly ISharedService _sharedService;
        private readonly IPopupService _popupService;

        public UpdateStudentInfoViewModel(
            IStudentService studentService,
            ISharedService sharedService,
            ICityService cityService,
            IPopupService popupService)
        {
            _sharedService = sharedService;
            _studentService = studentService;
            _cityService = cityService;
            SetCities();
            SetInfo();
            _popupService = popupService;
        }

        [ObservableProperty]
        private Popup popupInstance;

        private async Task SetCities()
        {
            var response = await _cityService.GetAll();

            if (response == null)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                return;
            }

            if (string.Compare(response.Status, "Failed", true) == 0)
            {
                IsError = true;
                ErrorMessage = response.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                return;
            }

            Cities = response.ResponseData;
        }

        private void SetInfo()
        {
            var student = _sharedService.GetValue<StudentModel>("student");

            if (student is null)
            {
                return;
            }

            FirstName = student.Name;
            LastName = student.Surname;
            PhoneNumber = student.UserData?.Phone ?? string.Empty;
            bool success = DateTime.TryParse(student.UserData?.DateOfBirth, out DateTime parsedDate);
            if (success)
            {
                BirthdayDate = parsedDate;
            }

            SelectedDrivingCategory = student.VehicleCategory;
            SelectedCity = student.City;
        }

        [ObservableProperty]
        private string firstName = string.Empty;

        [ObservableProperty]
        private string lastName = string.Empty;

        private string phoneNumber = string.Empty;

        public string PhoneNumber
        {
            get => phoneNumber;
            set
            {
                string stripped = Regex.Replace(value ?? "", @"\D", "");

                if (stripped.Length >= 3)
                    stripped = stripped.Insert(3, "-");
                if (stripped.Length >= 7)
                    stripped = stripped.Insert(7, "-");

                //TOOD: Adjust coursor position after adding -
                int cursorPosition = Math.Min(value?.Length ?? 0, stripped.Length);
                phoneNumber = stripped;

                if (!PhoneNumberValidator.IsValidPhoneNumber(phoneNumber))
                {
                    IsPhoneNumberError = true;
                }
                else
                {
                    IsPhoneNumberError = false;
                }

                OnPropertyChanged(nameof(PhoneNumber));
            }
        }

        private DateTime birthdayDate = DateTime.UtcNow.AddYears(-18);
        public DateTime BirthdayDate
        {
            get => birthdayDate;
            set
            {
                birthdayDate = value;
                OnPropertyChanged(nameof(BirthdayDate));

                if (value.Date > DateTime.UtcNow.AddYears(-18).Date)
                {
                    IsBirthDateError = true;

                }
                else
                {
                    IsBirthDateError = false;
                }
            }
        }


        [ObservableProperty]
        private string selectedDrivingCategory = "A";

        [ObservableProperty]
        private string[] drivingCategories = ["A", "B", "C", "D", "E"];

        [ObservableProperty]
        private bool isPhoneNumberError;

        [ObservableProperty]
        private string phoneNumberErrorMessage = AppErrorMessagesConstants.InvalidPhoneNumber;

        [ObservableProperty]
        private bool isBirthDateError;

        [ObservableProperty]
        private string birthDateErrorMessage = AppErrorMessagesConstants.TooYoungError;

        [ObservableProperty]
        public CityModel? selectedCity;

        [ObservableProperty]
        private bool isError = false;

        [ObservableProperty]
        private string errorMessage = "Default Error Message";

        [ObservableProperty]
        private List<CityModel> cities = [];

        [RelayCommand]
        public void Cancel()
        {
            _popupService.ClosePopup(PopupInstance);
        }

        [RelayCommand]
        public async Task UpdateInfo()
        {
            var response = await _studentService.UpdateMe(new UpdateUserMeModel
            {
                Name = FirstName,
                Surname = LastName,
                Phone = PhoneNumber,
                DateOfBirth = BirthdayDate.ToString(),
                CityId = SelectedCity?.Id,
                VehicleCategory = SelectedDrivingCategory
            });

            if (string.Compare(response.Status, ResponseStatuses.Sucess, true) == 0)
            {
                if (response.Data?.Student is not null)
                {
                    IsError = false;
                    _popupService.ClosePopup(PopupInstance);
                }

                ErrorMessage = AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                IsError = true;
            }
        }
    }
}
