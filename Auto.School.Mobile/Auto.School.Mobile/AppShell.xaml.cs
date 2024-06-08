using Auto.School.Mobile.Core.Constants;
using Auto.School.Mobile.Core.Responses.Auth.Login;
using Auto.School.Mobile.ViewModels;
using Auto.School.Mobile.Views;
using Auto.School.Mobile.Views.Instructor;
using Newtonsoft.Json;

namespace Auto.School.Mobile
{
    public partial class AppShell : Shell
    {
        public AppShell(AppShellViewModel appShellViewModel)
        {
            InitializeComponent();
            BindingContext = appShellViewModel;
            RegisterRoutes();
            //SetFlyoutItems();   
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
            Routing.RegisterRoute(nameof(InstructorAllInstructorsPage), typeof(InstructorAllInstructorsPage));
            Routing.RegisterRoute(nameof(InstructorInstructorDetailsPage), typeof(InstructorInstructorDetailsPage));
            Routing.RegisterRoute(nameof(InstructorMySchedulePage), typeof(InstructorMySchedulePage));
            Routing.RegisterRoute(nameof(StudentProfilePage), typeof(StudentProfilePage));
            Routing.RegisterRoute(nameof(ChatPage), typeof(ChatPage));
        }

        public void SetFlyoutItems()
        {
            var userRole = Preferences.Get("UserRole", string.Empty);
            var userDataJson = Preferences.Get("UserInfo", string.Empty);
            var userData =  JsonConvert.DeserializeObject<LoginResponseData>(userDataJson);

            if(userData is not null)
            {
                if (string.Compare(userRole, AppRoles.Student) == 0)
                {
                    if (string.Compare(userData.RequestStatus, "validated", true) == 0)
                    {
                        InstructorMenu.IsVisible = false;
                        NewStudentMenu.IsVisible = false;
                        StudentMenu.IsVisible = true;
                    }
                    else
                    {
                        InstructorMenu.IsVisible = false;
                        NewStudentMenu.IsVisible = true;
                        StudentMenu.IsVisible = false;
                    }
                }
                else if (string.Compare(userRole, AppRoles.Instructor) == 0)
                {
                    StudentMenu.IsVisible = false;
                    InstructorMenu.IsVisible = true;
                    NewStudentMenu.IsVisible = false;
                }
                else
                {
                    NewStudentMenu.IsVisible = false;
                    StudentMenu.IsVisible = false;
                    InstructorMenu.IsVisible = false;
                }

            }
        }
    }
}
