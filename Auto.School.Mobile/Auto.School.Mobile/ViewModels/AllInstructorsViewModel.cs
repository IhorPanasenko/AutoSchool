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

                _sharedService.Add<InstructorModel>("instructor", instructor);
                await AppShell.Current.GoToAsync(nameof(InstructorDetailsPage));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
        }
    }
}
