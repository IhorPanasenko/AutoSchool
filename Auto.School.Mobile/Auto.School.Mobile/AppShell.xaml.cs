using Auto.School.Mobile.ViewModels;
using Auto.School.Mobile.Views;

namespace Auto.School.Mobile
{
    public partial class AppShell : Shell
    {
        public AppShell(AppShellViewModel appShellViewModel)
        {
            InitializeComponent();
            BindingContext = appShellViewModel;
            Routing.RegisterRoute(nameof(HomePage), typeof(HomePage));
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
            Routing.RegisterRoute(nameof(RegistrationPage), typeof(RegistrationPage));
            Routing.RegisterRoute(nameof(StudentProfile), typeof(StudentProfile));
            Routing.RegisterRoute(nameof(AllInstructorsPage), typeof(AllInstructorsPage));
            Routing.RegisterRoute(nameof(InstructorDetailsPage), typeof(InstructorDetailsPage));
            Routing.RegisterRoute(nameof(ForgotPasswordPage), typeof(ForgotPasswordPage));
            Routing.RegisterRoute(nameof(UpdatePasswordPopUp), typeof(UpdatePasswordPopUp));
            Routing.RegisterRoute(nameof(InstructorScheduleStudentPage), typeof(InstructorScheduleStudentPage));
            Routing.RegisterRoute(nameof(UpdateStudentInfoPopUp), typeof(UpdateStudentInfoPopUp));
            Routing.RegisterRoute(nameof(SignUpToLessonPopUp), typeof (SignUpToLessonPopUp));
            Routing.RegisterRoute(nameof(StudentMyLessonsPage), typeof(StudentMyLessonsPage));
        }
    }
}
