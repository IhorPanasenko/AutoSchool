using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels.Instructor
{
    public partial class InstructorAllChatsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IChatsService _chatsService;
    }
}
