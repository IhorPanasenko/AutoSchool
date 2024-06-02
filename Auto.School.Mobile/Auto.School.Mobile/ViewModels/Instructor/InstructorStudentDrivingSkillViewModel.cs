using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels.Instructor
{
    public partial class InstructorStudentDrivingSkillViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly ISharedService _sharedService;
        private readonly IStudentService _studentService;
        private readonly IPopupService _popupService;

        public InstructorStudentDrivingSkillViewModel(ISharedService sharedService, IStudentService studentService, IPopupService popupService, IModifyCultureService modifyCultureService) : base(modifyCultureService)
        {
            _sharedService = sharedService;
            _studentService = studentService;
            _popupService = popupService;
            GetInfo();

        }

        [ObservableProperty]
        private Popup popupInstance;

        [ObservableProperty]
        private List<DrivingSkillModel> drivingSkills;

        [ObservableProperty]
        private bool isError = false;

        [ObservableProperty]
        private string errorMessage;

        [ObservableProperty]
        private double skillsProgress;

        private void GetInfo()
        {
            var skills = _sharedService.GetValue<List<DrivingSkillModel>>("DrivingSkills");

            if (skills is null)
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedToLoadDrivingSkills;
                return;
            }

            DrivingSkills = skills;
        }

        private void OrderDrivingSkills()
        {
            DrivingSkills = DrivingSkills
                .OrderBy(s => s.TypeEN)
                .ThenBy(s => s.SubtypeEN)
                .ToList();
        }

        [RelayCommand]
        public void Close()
        {
            _popupService.ClosePopup(PopupInstance);
        }
    }
}
