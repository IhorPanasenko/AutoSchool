using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.ViewModels;
using Auto.School.Mobile.Views;
using Auto.School.Mobile.Views.Instructor;

namespace Auto.School.Mobile
{
    public partial class AppShell : Shell
    {
        public AppShell(AppShellViewModel appShellViewModel)
        {
            InitializeComponent();
            BindingContext = appShellViewModel;
            RegisterRoutes();
            SetFlyoutItems();   
        }

        private void RegisterRoutes()
        {
            Routing.RegisterRoute(nameof(HomePage), typeof(HomePage));
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
            Routing.RegisterRoute(nameof(RegistrationPage), typeof(RegistrationPage));
            Routing.RegisterRoute(nameof(StudentProfile), typeof(StudentProfile));
            Routing.RegisterRoute(nameof(AllInstructorsPage), typeof(AllInstructorsPage));
            Routing.RegisterRoute(nameof(InstructorDetailsPage), typeof(InstructorDetailsPage));
            Routing.RegisterRoute(nameof(ForgotPasswordPage), typeof(ForgotPasswordPage));
            Routing.RegisterRoute(nameof(InstructorScheduleStudentPage), typeof(InstructorScheduleStudentPage));
            Routing.RegisterRoute(nameof(StudentMyLessonsPage), typeof(StudentMyLessonsPage));
            Routing.RegisterRoute(nameof(InstructorProfilePage), typeof(InstructorProfilePage));
            Routing.RegisterRoute(nameof(StudentProfilePage), typeof(StudentProfilePage));
        }

        public void SetFlyoutItems()
        {
            string userRole = Preferences.Get("UserRole", string.Empty);

            if (string.Compare(userRole, AppRoles.Student)==0)
            {
                InstructorMenu.IsVisible = false;
                StudentMenu.IsVisible = true;
            }
            else if (string.Compare(userRole, AppRoles.Instructor) == 0)
            {
                StudentMenu.IsVisible = false;
                InstructorMenu.IsVisible = true;
            }
            else
            {
                StudentMenu.IsVisible = false;
                InstructorMenu.IsVisible = false;
            }
        }
    }
}
