using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views;
using Auto.School.Mobile.Views.Instructor;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels.Instructor
{
    public partial class InstructorStudentProfileViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IStudentService _studentService;
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;
        private readonly Abstract.IPopupService _popupService;
        private readonly ILessonService _lessonService;

        public InstructorStudentProfileViewModel(IStudentService studentService, IInstructorService instructorService, ISharedService sharedService, Abstract.IPopupService popupService, ILessonService lessonService, IModifyCultureService modifyCultureService) : base(modifyCultureService)
        {
            _studentService = studentService;
            _instructorService = instructorService;
            _sharedService = sharedService;
            _popupService = popupService;
            _lessonService = lessonService;
            _ = LoadStudent();
        }

        private async Task LoadStudent()
        {
            var studentId = _sharedService.GetValue<string>("StudentId");
            var studentResponse = await _studentService.GetOne(studentId);

            IsLoading = false;
            if (studentResponse is null)
            {
                IsError = true;
                ErrorMesssage = AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                return;
            }

            if (string.Compare(studentResponse.Status, ResponseStatuses.Sucess, true) != 0)
            {
                IsError = true;
                ErrorMesssage = studentResponse.Message!;
                return;
            }

            IsError = false;
            Student = studentResponse.Data.Student;

            switch (Student.RequestStatus)
            {
                case LinkToInstructorResponseStatus.NotSent:
                    IsInstructorRequestSent = false;
                    IsInstructorRequestAccepted = false;
                    IsInstructorMessageVisible = true;
                    IsViewInstructorsVisible = true;
                    InstructorMessage = AppMessages.RequestNotSent;
                    break;
                case LinkToInstructorResponseStatus.Pending:
                    IsInstructorRequestSent = true;
                    IsInstructorRequestAccepted = false;
                    InstructorMessage = AppMessages.Pending;
                    IsInstructorMessageVisible = true;
                    IsViewInstructorsVisible = false;
                    await LoadInstructor(Student.InstructorId!);
                    break;
                case LinkToInstructorResponseStatus.Accepted:
                    IsInstructorRequestSent = true;
                    IsInstructorRequestAccepted = true;
                    IsViewInstructorsVisible = true;
                    IsInstructorMessageVisible = false;
                    await LoadInstructor(Student.InstructorId!);
                    await GetLessonStatistic();
                    break;
                case LinkToInstructorResponseStatus.Rejected:
                    IsInstructorRequestSent = true;
                    IsInstructorRequestAccepted = false;
                    IsInstructorMessageVisible = true;
                    IsViewInstructorsVisible = false;
                    InstructorMessage = AppMessages.Rejected;
                    await LoadInstructor(Student.InstructorId!);
                    break;
                default:
                    IsInstructorRequestSent = false;
                    IsInstructorRequestAccepted = false;
                    IsViewInstructorsVisible = true;
                    IsInstructorMessageVisible = true;
                    InstructorMessage = AppMessages.RequestNotSent;
                    break;
            }
        }

        private async Task LoadInstructor(string instructorId)
        {
            var response = await _instructorService.GetOne(instructorId);

            if (response is null || string.Compare(response.Status, ResponseStatuses.Fail, true) == 0)
            {
                IsError = true;
                ErrorMesssage = AppErrorMessagesConstants.FailedToLoadInstuctor;
                return;
            }

            IsError = false;
            Instructor = response.Instructor;
        }

        private async Task GetLessonStatistic()
        {
            var passedSkills = Student.DrivingSkills!.Where(d => d.Completed).ToList().Count;
            NumberPassedSkills = passedSkills;
        }

        [ObservableProperty]
        private int numberPassedLessons;

        [ObservableProperty]
        private InstructorModel instructor;

        [ObservableProperty]
        private StudentModel student;

        [ObservableProperty]
        private bool isError = false;

        [ObservableProperty]
        private string errorMesssage = string.Empty;

        [ObservableProperty]
        private bool isInstructorRequestSent;

        [ObservableProperty]
        private string instructorMessage;

        [ObservableProperty]
        private bool isInstructorRequestAccepted;

        [ObservableProperty]
        private bool isViewInstructorsVisible;

        [ObservableProperty]
        private bool isInstructorMessageVisible;

        [ObservableProperty]
        private int numberPassedSkills;

        private bool isLoading = true;

        public bool IsLoading
        {
            get { return isLoading; }
            set
            {
                isLoading = value;
                OnPropertyChanged(nameof(IsLoading));
                OnPropertyChanged(nameof(IsNotLoading));
            }
        }

        public bool IsNotLoading
        {
            get { return !isLoading; }
            private set { }
        }

        [RelayCommand]
        public async Task OpenDrivingSills()
        {
            _sharedService.Add("DrivingSkills", Student.DrivingSkills!);
            await _popupService.ShowPopupAsync<InstructorStudentDrivingSkillPopUp>();
        }
    }
}
