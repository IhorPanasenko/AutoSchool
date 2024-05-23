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

            builder.Services.AddTransient<IAuthenticationRequest, AuthenticationRequests>();
            builder.Services.AddTransient<ICityRequest, CityRequests>();
            builder.Services.AddTransient<IInstructorRequest, InstructorRequests>();
            builder.Services.AddTransient<IStudentRequest, StudentRequests>();

            builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
            builder.Services.AddTransient<ICityService, CityService>();
            builder.Services.AddTransient<IInstructorService, InstructorService>();
            builder.Services.AddSingleton<ISharedService, SharedService>();
            builder.Services.AddTransient<IStudentService, StudentService>();
            builder.Services.AddSingleton<IPopupService, Services.PopupService>();

            builder.Services.AddSingleton<ErrorAlertView>();

            builder.Services.AddTransient<LoginViewModel>();
            builder.Services.AddSingleton<RegistrationViewModel>();
            builder.Services.AddSingleton<HomeViewModel>();
            builder.Services.AddSingleton<AllInstructorsViewModel>();
            builder.Services.AddSingleton<InstructorDetailsViewModel>();
            builder.Services.AddSingleton<ForgotPasswordViewModel>();
            builder.Services.AddSingleton<AppShellViewModel>();
            builder.Services.AddSingleton<StudentProfileViewModel>();
            builder.Services.AddTransient<UpdatePasswordViewModel>();
            builder.Services.AddTransient<UpdateStudentInfoViewModel>();
            builder.Services.AddTransient<InstructorScheduleStudentViewModel>();

            builder.Services.AddSingleton<HomePage>();
            builder.Services.AddTransient<LoginPage>();
            builder.Services.AddSingleton<RegistrationPage>();
            builder.Services.AddSingleton<ContactPage>();
            builder.Services.AddSingleton<AboutPage>();
            builder.Services.AddSingleton<AllInstructorsPage>();
            builder.Services.AddSingleton<InstructorDetailsPage>();
            builder.Services.AddSingleton<ForgotPasswordPage>();
            builder.Services.AddSingleton<AppShell>();
            builder.Services.AddSingleton<StudentProfile>();
            builder.Services.AddTransient<UpdatePasswordPopUp>();
            builder.Services.AddTransient<UpdateStudentInfoPopUp>();
            builder.Services.AddTransient<InstructorScheduleStudentPage>();
#if DEBUG
            builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}
