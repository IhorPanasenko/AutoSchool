using Auto.School.Mobile.Service.Interfaces;
using System.ComponentModel;

namespace Auto.School.Mobile.ViewModels.Instructor
{
    public partial class InstructorAllChatsViewModel : BaseViewModel, INotifyPropertyChanged
    {
        private readonly IChatService _chatsService;
    }
}
