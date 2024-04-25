using Auto.School.Mobile.Models;
using CommunityToolkit.Mvvm.ComponentModel;
using System.Collections.ObjectModel;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels
{
    public partial class AllInstructorsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        public AllInstructorsViewModel()
        {
            
        }

        private void LoadInstructors()
        {
            
        }

        [ObservableProperty]
        List<InstructorModel> instructors ;
    }
}
