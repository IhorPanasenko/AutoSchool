using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Maui.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class StudentDrivingSkilllsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly ISharedService _sharedService;
        private readonly IStudentService _studentService;
        private readonly IPopupService _popupService;

        public StudentDrivingSkilllsViewModel(ISharedService sharedService, IStudentService studentService, IPopupService popupService)
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

            if(skills is  null) 
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
        public async Task CompleteSkill(DrivingSkillModel skill)
        {
            if (skill == null || skill.Completed)
            {
                return;
            }
            DrivingSkills.FirstOrDefault(ds => ds.Id == skill.Id)!.Completed = true;
            DrivingSkills.FirstOrDefault(ds => ds.Id == skill.Id)!.DateCompleted = DateTime.Now.Date;
            var result = await _studentService.UpdateDrivingSkills(DrivingSkills);

            if (string.Compare(result.Status, ResponseStatuses.Sucess, true) == 0)
            {
                if (result.Data?.DrivingSkills is not null)
                {
                    DrivingSkills = result.Data.DrivingSkills;
                    OrderDrivingSkills();
                }
            }
            else
            {
                IsError = true;
                ErrorMessage = AppErrorMessagesConstants.FailedToUpdateSkill;
            }
        }

        [RelayCommand]
        public void Close()
        {
            _popupService.ClosePopup(PopupInstance);
        }
    }
}
