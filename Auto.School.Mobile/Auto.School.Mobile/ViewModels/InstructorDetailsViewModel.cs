using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.Service.Interfaces;
using CommunityToolkit.Mvvm.ComponentModel;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class InstructorDetailsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IInstructorService _instructorService;

        public InstructorDetailsViewModel(IInstructorService instructorService)
        {
            _instructorService = instructorService;
            LoadInstructor();
        }

        private async Task LoadInstructor ()
        {
            Instructor = await _instructorService.GetInstructorAsync(instructorId);
        }

        [ObservableProperty]
        private InstructorModel instructor;
        
    }
}
