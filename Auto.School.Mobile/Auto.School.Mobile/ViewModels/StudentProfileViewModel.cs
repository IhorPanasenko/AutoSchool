using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class StudentProfileViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IStudentService _studentService;
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;

        public StudentProfileViewModel(IStudentService studentService, IInstructorService instructorService, ISharedService sharedService)
        {
            _studentService = studentService;
            _instructorService = instructorService;
            _sharedService = sharedService;
            LoadStudent();
        }

        private async Task LoadStudent()
        {
            var studentResponse = await _studentService.GetInfoMe();

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
            Student = studentResponse.Student;

            switch (Student.RequestStatus)
            {
                case LinkToInstructorResponseStatus.NotSent:
                    IsInstructorRequestSent = false;
                    IsInstructirRequestAccepted = false;
                    IsInstructorMessageVisible = true;
                    InstructorMessage = AppMessages.RequestNotSent;
                    break;
                case LinkToInstructorResponseStatus.Pending:
                    IsInstructorRequestSent = true;
                    IsInstructirRequestAccepted = false;
                    InstructorMessage = AppMessages.Pending;
                    IsInstructorMessageVisible = true;
                    await LoadInstructor(Student.InstructorId);
                    break;
                case LinkToInstructorResponseStatus.Accepted:
                    await LoadInstructor(Student.InstructorId);
                    break;
                case LinkToInstructorResponseStatus.Rejected:
                    IsInstructorRequestSent = true;
                    IsInstructirRequestAccepted = false;
                    IsInstructorMessageVisible = true;
                    InstructorMessage = AppMessages.Rejected;
                    await LoadInstructor(Student.InstructorId);
                    break;
                default:
                    IsInstructorRequestSent = false;
                    IsInstructirRequestAccepted = false;
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
        private bool isInstructirRequestAccepted;

        [ObservableProperty]
        private bool isInstructorMessageVisible;

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
        public async Task UpdatePhoto()
        {
            throw new NotImplementedException();
        }

        [RelayCommand]
        public async Task GoToInstructors()
        {
            await Shell.Current.GoToAsync($"/{nameof(AllInstructorsPage)}");
        }

        [RelayCommand]
        public async Task GoToSchedule()
        {
            throw new NotImplementedException();
        }

        [RelayCommand]
        public async Task OpenChat()
        {
            throw new NotImplementedException();
        }

        [RelayCommand]
        public async Task ViewDetailedInfoComamnd()
        {
            
        }

    }
}
