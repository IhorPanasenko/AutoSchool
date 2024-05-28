using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Models;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class StudentDrivingSkilllsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly ISharedService _sharedService;

        public StudentDrivingSkilllsViewModel(ISharedService sharedService)
        {
            _sharedService = sharedService;
        }

        [ObservableProperty]
        private Popup popupInstance;

        [ObservableProperty]
        private List<DrivingSkillModel> drivingSkills;


    }
}
