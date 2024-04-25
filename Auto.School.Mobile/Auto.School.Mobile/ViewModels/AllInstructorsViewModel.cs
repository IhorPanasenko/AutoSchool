using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class AllInstructorsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;
        public AllInstructorsViewModel(IInstructorService instructorService)
        {
            _instructorService = instructorService;
            LoadInstructors();
        }

        private async Task LoadInstructors()
        {
            var response = await _instructorService.GetAll();

            if (!string.Equals(response.Status, "success", StringComparison.InvariantCultureIgnoreCase))
            {
                ErrorMessage = response.Message ?? AppErrorMessagesConstants.SomethingWentWrongErrorMessage;
                IsError = true;
                return;
            }

            Instructors = response.Instructors;
        }

        [ObservableProperty]
        private string errorMessage = string.Empty;

        [ObservableProperty]
        private bool isError = false;

        [ObservableProperty]
        List<InstructorModel> instructors;
    }
}
