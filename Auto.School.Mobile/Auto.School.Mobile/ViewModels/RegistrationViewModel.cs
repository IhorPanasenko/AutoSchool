using Auto.School.Mobile.Models;
using CommunityToolkit.Mvvm.ComponentModel;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class RegistrationViewModel : BaseViewModel, INotifyPropertyChanged
    {
        [ObservableProperty]
        private string _firstName = string.Empty;

        [ObservableProperty] 
        private string _lastName = string.Empty;

        [ObservableProperty]
        private string _phoneNumber = string.Empty;

        [ObservableProperty]
        private DateTime _birthdayDate;

        [ObservableProperty]
        private string _photoUrl = string.Empty;

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
    }
}
