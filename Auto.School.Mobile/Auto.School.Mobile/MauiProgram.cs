using Auto.School.Mobile.Views;
using Auto.School.Mobile.ViewModels;
using Microsoft.Extensions.Logging;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Service.Services;
using Auto.School.Mobile.Shared.Alerts;
using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Services;
using Auto.School.Mobile.ApiIntegration.Servicecs.Abstract;
using Auto.School.Mobile.ApiIntegration.Servicecs.Implementation;
using Auto.School.Mobile.ApiIntegration.Base.Abstract;
using Auto.School.Mobile.ApiIntegration.Base.Implementation;
using Auto.School.Mobile.ApiIntegration.Requests.Abstract;
using Auto.School.Mobile.ApiIntegration.Requests.Implementation;
using CommunityToolkit.Maui;
using Auto.School.Mobile.Core.Models;

namespace Auto.School.Mobile
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            
            builder
                .UseMauiApp<App>()
                .UseMauiCommunityToolkit()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

            builder.Services.AddSingleton<IHttpClientService, HttpClientService>();
            builder.Services.AddTransient<IGetRequest, GetRequest>();
            builder.Services.AddTransient<IPostRequest, PostRequest>();
            builder.Services.AddTransient<IPatchRequest, PatchRequest>();
            builder.Services.AddTransient<IDeleteRequest, DeleteRequest>();
            builder.Services.AddSingleton<ITokenExpirationService, TokenExpirationService>();

            builder.Services.AddTransient<IAuthenticationRequest, AuthenticationRequests>();
            builder.Services.AddTransient<ICityRequest, CityRequests>();
            builder.Services.AddTransient<IInstructorRequest, InstructorRequests>();
            builder.Services.AddTransient<IStudentRequest, StudentRequests>();
            builder.Services.AddTransient<ILessonRequest, LessonRequest>();
            builder.Services.AddTransient<IReviewRequest, ReviewRequest>();

            builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
            builder.Services.AddTransient<ICityService, CityService>();
            builder.Services.AddTransient<IInstructorService, InstructorService>();
            builder.Services.AddSingleton<ISharedService, SharedService>();
            builder.Services.AddTransient<IStudentService, StudentService>();
            builder.Services.AddSingleton<IPopupService, Services.PopupService>();
            builder.Services.AddTransient<ICultureService, CultureService>();
            builder.Services.AddScoped<ILessonService, LessonService>();
            builder.Services.AddScoped<IReviewService, ReviewService>();

            builder.Services.AddTransient<ErrorAlertView>();

            builder.Services.AddTransient<LoginViewModel>();
            builder.Services.AddTransient<RegistrationViewModel>();
            builder.Services.AddTransient<HomeViewModel>();
            builder.Services.AddTransient<AllInstructorsViewModel>();
            builder.Services.AddTransient<InstructorDetailsViewModel>();
            builder.Services.AddTransient<ForgotPasswordViewModel>();
            builder.Services.AddSingleton<AppShellViewModel>();
            builder.Services.AddTransient<StudentProfileViewModel>();
            builder.Services.AddTransient<UpdatePasswordViewModel>();
            builder.Services.AddTransient<UpdateStudentInfoViewModel>();
            builder.Services.AddTransient<InstructorScheduleStudentViewModel>();
            builder.Services.AddTransient<SignUpToLessonViewModel>();
            builder.Services.AddTransient<StudentMyLessonsViewModel>();
            builder.Services.AddTransient<StudentDrivingSkilllsViewModel>();
            builder.Services.AddTransient<AddReviewViewModel>();

            builder.Services.AddSingleton<HomePage>();
            builder.Services.AddTransient<LoginPage>();
            builder.Services.AddTransient<RegistrationPage>();
            builder.Services.AddTransient<ContactPage>();
            builder.Services.AddTransient<AboutPage>();
            builder.Services.AddTransient<AllInstructorsPage>();
            builder.Services.AddTransient<InstructorDetailsPage>();
            builder.Services.AddTransient<ForgotPasswordPage>();
            builder.Services.AddSingleton<AppShell>();
            builder.Services.AddTransient<StudentProfile>();
            builder.Services.AddTransient<UpdatePasswordPopUp>();
            builder.Services.AddTransient<UpdateStudentInfoPopUp>();
            builder.Services.AddTransient<InstructorScheduleStudentPage>();
            builder.Services.AddTransient<SignUpToLessonPopUp>();
            builder.Services.AddTransient<StudentMyLessonsPage>();
            builder.Services.AddTransient<StudentDrivingSkillsPopUp>();
            builder.Services.AddTransient<StudentAddInstructorReviewPopUp>();
#if DEBUG
            builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}
