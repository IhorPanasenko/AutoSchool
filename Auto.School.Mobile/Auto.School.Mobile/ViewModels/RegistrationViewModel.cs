using Auto.School.Mobile.Models;
using CommunityToolkit.Mvvm.ComponentModel;
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
        private DateTime birthdayDate;

        [ObservableProperty]
        public City? selectedCity;
        public List<City> Cities { get; set; }

        public RegistrationViewModel()
        {
            Cities = [
                new City() {Id = "1", Name="Kharkiv"},
                new City() {Id = "2", Name="Kiyev"},
                new City() {Id = "3", Name="Odessa"},
                new City() {Id = "4", Name="Lviv"},
            ];

            selectedCity = Cities.FirstOrDefault();
        }
    }
}
