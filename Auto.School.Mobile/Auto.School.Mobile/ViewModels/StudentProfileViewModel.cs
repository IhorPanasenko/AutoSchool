using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class StudentProfileViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IStudentService _studentService;
        private readonly IInstructorService _instructorService;

        public StudentProfileViewModel(IStudentService studentService, IInstructorService instructorService)
        {
            _studentService = studentService;
            _instructorService = instructorService;
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

            if(Student.InstructorId is not null)
            {
                await LoadInstructor(Student.InstructorId);
            }
        }

        private async Task LoadInstructor(string instructorId)
        {
            var response = await _instructorService.GetOne(instructorId);

            if(response is null || string.Compare(response.Status, ResponseStatuses.Fail, true) == 0)
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
        private bool isAttachedToInstructor;

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

    }
}
