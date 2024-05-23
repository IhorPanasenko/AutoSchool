using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views;
using CommunityToolkit.Maui.Core;
using CommunityToolkit.Maui.Views;
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
        private readonly Abstract.IPopupService _popupService;

        public StudentProfileViewModel(IStudentService studentService, IInstructorService instructorService, ISharedService sharedService, Abstract.IPopupService popupService)
        {
            _studentService = studentService;
            _instructorService = instructorService;
            _sharedService = sharedService;
            _popupService = popupService;
            _ = LoadStudent();
            
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
                    await LoadInstructor(Student.InstructorId);
                    break;
                case LinkToInstructorResponseStatus.Accepted:
                    IsInstructorRequestSent = true;
                    IsInstructorRequestAccepted = true;
                    IsViewInstructorsVisible = true;
                    IsInstructorMessageVisible = false;
                    await LoadInstructor(Student.InstructorId);
                    break;
                case LinkToInstructorResponseStatus.Rejected:
                    IsInstructorRequestSent = true;
                    IsInstructorRequestAccepted = false;
                    IsInstructorMessageVisible = true;
                    IsViewInstructorsVisible = false;
                    InstructorMessage = AppMessages.Rejected;
                    await LoadInstructor(Student.InstructorId);
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
            var imageStream = await PickImage();
            if(imageStream != null)
            {
                var response = await _studentService.UpdateProfileImage(imageStream);
                IsError = true;
                ErrorMesssage = AppErrorMessagesConstants.FailedUpdateUserPhoto;
                await LoadStudent();
            }
        }

        private async Task<Stream> PickImage()
        {
            try
            {
                var result = await FilePicker.PickAsync(new PickOptions
                {
                    PickerTitle = "Pick an image",
                    FileTypes = FilePickerFileType.Images
                });

                if (result != null)
                {
                    var stream = await result.OpenReadAsync();
                    return stream;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                ErrorMesssage = AppErrorMessagesConstants.FailedToPickImage;
                IsError = true;
            }

            return null;
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
        public async Task ViewDetailedInfo()
        {
            try
            {
                if (Instructor == null)
                {
                    return;
                }

                _sharedService.Add("instructor", Instructor);
                await Shell.Current.GoToAsync(nameof(InstructorDetailsPage));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

        [RelayCommand]
        public async Task UpdatePassword()
        {
            await _popupService.ShowPopupAsync<UpdatePasswordPopUp>();
        }

        [RelayCommand]
        public async Task UpdateInfo()
        {
            _sharedService.Add("student", Student);
            await _popupService.ShowPopupAsync<UpdateStudentInfoPopUp>();
            await LoadStudent();
        }
    }
}
