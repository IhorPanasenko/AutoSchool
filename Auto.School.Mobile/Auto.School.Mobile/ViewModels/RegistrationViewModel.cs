using Auto.School.Mobile.Models;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class RegistrationViewModel : BaseViewModel, INotifyPropertyChanged
    {
        [ObservableProperty]
        private string firstName = string.Empty;

        [ObservableProperty] 
        private string lastName = string.Empty;

        [ObservableProperty]
        private string phoneNumber = string.Empty;

        [ObservableProperty]
        private DateTime birthdayDate = DateTime.UtcNow.AddYears(-18);

        [ObservableProperty]
        public City? _selectedCity;
        public List<City> Cities { get; set; }

        public RegistrationViewModel()
        {
            Cities = [
                new City() {Id = "1", Name="Kharkiv"},
                new City() {Id = "2", Name="Kiyev"},
                new City() {Id = "3", Name="Odessa"},
                new City() {Id = "4", Name="Lviv"},
            ];

            _selectedCity = Cities.FirstOrDefault();
        }

        [RelayCommand]
        public async Task GoToLogin()
        {

        }
    }
}
