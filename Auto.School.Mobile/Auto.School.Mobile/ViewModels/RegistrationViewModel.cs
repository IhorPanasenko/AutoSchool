using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Validators;
using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;
using System.Text.RegularExpressions;

namespace Auto.School.Mobile.ViewModels
{
    public partial class RegistrationViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly ICityService _cityService;
        private readonly IAuthenticationService _authenticationService;
        public RegistrationViewModel(ICityService cityService, IAuthenticationService authenticationService)
        {
            _cityService = cityService;
            _authenticationService = authenticationService;
            SetCities();
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


                //if (value != null && cursorPosition != value.Length)
                //{
                //    // Move the cursor to the appropriate position after formatting
                //    Device.InvokeMainThreadAsync(() =>
                //    {
                //        // Set the cursor position
                //        YourPhoneNumberEntryName.CursorPosition = cursorPosition;
                //    });
                //}
            }
        }


        private string email = string.Empty;

        public string Email
        {
            get { return email; }

            set
            {
                email = value;
                OnPropertyChanged(nameof(Email));

                if (!EmailValidator.Validate(value))
                {
                    IsEmailError = true;
                }
                else
                {
                    IsEmailError = false;
                }
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


        private string password = string.Empty;

        public string Password
        {
            get => password;
            set
            {
                var validationResult = PasswordValidator.Validate(value);

                if (validationResult is not null)
                {
                    IsPasswordError = true;
                    PasswordErrorMessage = validationResult;
                }
                else
                {
                    IsPasswordError = false;
                    PasswordErrorMessage = string.Empty;
                }

                if (!string.IsNullOrEmpty(RepeatPassword))
                {
                    if (!string.Equals(value, RepeatPassword, StringComparison.Ordinal))
                    {
                        IsRepeatPasswordError = true;
                    }
                    else
                    {
                        IsRepeatPasswordError = false;
                    }
                }

                password = value;
            }
        }

        [ObservableProperty]
        public CityModel? selectedCity;

        [ObservableProperty]
        private bool isError = false;

        //private bool is

        [ObservableProperty]
        private string errorMessage = "Default Error Message";

        [ObservableProperty]
        private List<CityModel> cities = [];

        [ObservableProperty]
        private bool isEmailError;

        [ObservableProperty]
        private string emailErrorMessage = AppErrorMessagesConstants.InvalidEmail;

        [ObservableProperty]
        private bool isPhoneNumberError;

        [ObservableProperty]
        private string phoneNumberErrorMessage = AppErrorMessagesConstants.InvalidPhoneNumber;

        [ObservableProperty]
        private bool isBirthDateError;

        [ObservableProperty]
        private string birthDateErrorMessage = AppErrorMessagesConstants.TooYoungError;

        [ObservableProperty]
        private bool isPasswordError;

        [ObservableProperty]
        private string passwordErrorMessage = "";

        [ObservableProperty]
        private string selectedDrivingCtegory = "A";

        [ObservableProperty]
        private string[] drivingCategories = ["A", "B", "C", "D", "E"];

        private string repeatPassword;

        public string RepeatPassword
        {
            get
            {
                return repeatPassword;
            }
            set
            {
                repeatPassword = value;

                if (!string.Equals(value, Password, StringComparison.Ordinal))
                {
                    IsRepeatPasswordError = true;
                }
                else
                {
                    IsRepeatPasswordError = false;
                }

                OnPropertyChanged(nameof(RepeatPassword));
            }
        }

        [ObservableProperty]
        private bool isRepeatPasswordError = false;

        [ObservableProperty]
        private string repeatPasswordErrorMessage = AppErrorMessagesConstants.NotEqualPasswords;

        private bool isPassword = true;

        public bool IsPassword
        {
            get
            {
                return isPassword;
            }

            set
            {
                isPassword = value;
                PasswordVisibleImageSource = isPassword ? "closed_eye.png" : "open_eye.png";
                OnPropertyChanged(nameof(IsPassword));
            }
        }

        private string passwordVisibleImageSource = "closed_eye.png";

        public string PasswordVisibleImageSource
        {
            get
            {
                return passwordVisibleImageSource;
            }

            set
            {
                if (passwordVisibleImageSource != value)
                {
                    passwordVisibleImageSource = value;
                    OnPropertyChanged(nameof(PasswordVisibleImageSource));
                }
            }
        }


        [RelayCommand]
        public void ShowPassword()
        {
            IsPassword = !IsPassword;
        }

        private bool isRepeatPassword = true;

        public bool IsRepeatPassword
        {
            get
            {
                return isRepeatPassword;
            }

            set
            {
                isRepeatPassword = value;
                RepeatPasswordVisibleImageSource = IsRepeatPassword ? "closed_eye.png" : "open_eye.png";
                OnPropertyChanged(nameof(IsRepeatPassword));
            }
        }

        private string repeatPasswordVisibleImageSource = "closed_eye.png";

        public string RepeatPasswordVisibleImageSource
        {
            get
            {
                return repeatPasswordVisibleImageSource;
            }

            set
            {
                if (repeatPasswordVisibleImageSource != value)
                {
                    repeatPasswordVisibleImageSource = value;
                    OnPropertyChanged(nameof(RepeatPasswordVisibleImageSource));
                }
            }
        }

        [RelayCommand]
        public void ShowRepeatPassword()
        {
            IsRepeatPassword = !IsRepeatPassword;
        }

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

        [RelayCommand]
        public async Task GoToLogin()
        {
            await Shell.Current.Navigation.PopAsync();
        }

        [RelayCommand]
        public async Task Register()
        {
            if (!IsModelValid())
            {
                IsError = true;
                return;
            }

            var registrationModel = new RegistrationModel()
            {
                FirstName = FirstName,
                LastName = LastName,
                Email = Email,
                Password = Password,
                DateOfBirth = BirthdayDate,
                Phone = PhoneNumber,
                VehicleCategory = SelectedDrivingCtegory,
                CityId = SelectedCity!.Id
            };

            var authenticationResponse = await _authenticationService.RegisterAsync(registrationModel);

            if (string.Equals(authenticationResponse.Status, "Failed", StringComparison.CurrentCultureIgnoreCase))
            {
                IsError = true;
                ErrorMessage = authenticationResponse.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
            }

            await Shell.Current.GoToAsync($"//{nameof(LoginPage)}");
        }

        private bool IsModelValid()
        {

            if (string.IsNullOrWhiteSpace(FirstName))
            {
                IsError = true;
                ErrorMessage = "First name is required.";
                return false;
            }

            if (string.IsNullOrWhiteSpace(LastName))
            {
                IsError = true;
                ErrorMessage = "Last name is required.";
                return false;
            }

            if (string.IsNullOrWhiteSpace(PhoneNumber) || IsPhoneNumberError)
            {
                IsError = true;
                ErrorMessage = "Phone number is invalid.";
                return false;
            }

            if (string.IsNullOrWhiteSpace(Email) || IsEmailError)
            {
                IsError = true;
                ErrorMessage = "Email is invalid.";
                return false;
            }

            if (BirthdayDate.Date > DateTime.UtcNow.AddYears(-18).Date || IsBirthDateError)
            {
                IsError = true;
                ErrorMessage = "You must be at least 18 years old.";
                return false;
            }

            if (SelectedCity is null)
            {
                IsError = true;
                ErrorMessage = "Please select a city.";
                return false;
            }

            return true;
        }

    }
}
