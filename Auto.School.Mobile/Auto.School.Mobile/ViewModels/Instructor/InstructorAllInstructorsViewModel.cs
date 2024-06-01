using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Core.Responses.Auth.Login;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Views.Instructor;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Newtonsoft.Json;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels.Instructor
{
    public partial class InstructorAllInstructorsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        private readonly ISharedService _sharedService;
        public InstructorAllInstructorsViewModel(IInstructorService instructorService, ISharedService sharedService)
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

            var infoJson = Preferences.Get("UserInfo", null);
            var info = JsonConvert.DeserializeObject<LoginResponseData>(infoJson!);

            var me = response.Instructors.FirstOrDefault(i => i.UserId == info!.UserData.Id);
            if (me is not null)
            {
                response.Instructors.Remove(me);
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
                await Shell.Current.GoToAsync(nameof(InstructorInstructorDetailsPage));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }

    }
}
