using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Validators;
using CommunityToolkit.Mvvm.ComponentModel;
using System.ComponentModel;
using System.Text.RegularExpressions;


namespace Auto.School.Mobile.ViewModels
{
    public partial class UpdateStudentInfoViewModel(IStudentService studentService) : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IStudentService _studentService = studentService;


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
        private string selectedDrivingCtegory = "A";

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
    }
}
