using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Auth.Login;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class AllInstructorsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;
        public AllInstructorsViewModel(IInstructorService instructorService, ISharedService sharedService)
        {
            _instructorService = instructorService;
            _sharedService = sharedService;
            LoadInstructors();
        }

        private async Task LoadInstructors()
        {
            var response = await _instructorService.GetAll();

            if (!string.Equals(response.Status, "success", StringComparison.InvariantCultureIgnoreCase))
            {
                ErrorMessage = response.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                IsError = true;
                IsLoading = false;
                return;
            }

            var userRole = Preferences.Get("UserRole", string.Empty);

            if (string.Compare(userRole, AppRoles.Instructor, true) == 0)
            {
                var infoJson = Preferences.Get("UserInfo", null);
                var info = JsonConvert.DeserializeObject<LoginResponseData>(infoJson!);

                if (info is not null)
                {
                    var me = response.Instructors.FirstOrDefault(i => i.UserId == info.UserData.Id);
                    if (me is not null)
                    {
                        response.Instructors.Remove(me);
                    }
                }
            }

            Instructors = response.Instructors;
            IsLoading = false;
        }

        [ObservableProperty]
        private string errorMessage = string.Empty;

        [ObservableProperty]
        private bool isError = false;

        [ObservableProperty]
        private bool isLoading = true;

        [ObservableProperty]
        List<InstructorModel> instructors = [];

        [RelayCommand]
        public async Task NavigateToInstructorDetails(InstructorModel instructor)
        {
            try
            {
                if (instructor == null)
                {
                    return;
                }

                _sharedService.Add("instructor", instructor);
                await Shell.Current.GoToAsync(nameof(InstructorDetailsPage));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
