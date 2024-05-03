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

namespace Auto.School.Mobile
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });

            builder.Services.AddSingleton<IHttpClientService, HttpClientService>();
            builder.Services.AddSingleton<IGetRequest, GetRequest>();
            builder.Services.AddSingleton<IPostRequest, PostRequest>();
            builder.Services.AddSingleton<IPatchRequest, PatchRequest>();

            builder.Services.AddTransient<IAuthenticationRequest, AuthenticationRequests>();
            builder.Services.AddTransient<ICityRequest, CityRequests>();
            builder.Services.AddTransient<IInstructorRequest, InstructorRequests>();
            builder.Services.AddTransient<IStudentRequest, StudentRequests>();

            builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
            builder.Services.AddTransient<ICityService, CityService>();
            builder.Services.AddTransient<IInstructorService, InstructorService>();
            builder.Services.AddSingleton<ISharedService, SharedService>();
            builder.Services.AddTransient<IStudentService, StudentService>();

            builder.Services.AddSingleton<ErrorAlertView>();

            builder.Services.AddSingleton<LoginViewModel>();
            builder.Services.AddSingleton<RegistrationViewModel>();
            builder.Services.AddSingleton<HomeViewModel>();
            builder.Services.AddSingleton<AllInstructorsViewModel>();
            builder.Services.AddSingleton<InstructorDetailsViewModel>();

            builder.Services.AddSingleton<HomePage>();
            builder.Services.AddSingleton<LoginPage>();
            builder.Services.AddSingleton<RegistrationPage>();
            builder.Services.AddSingleton<ContactPage>();
            builder.Services.AddSingleton<AboutPage>();
            builder.Services.AddSingleton<AllInstructorsPage>();
            builder.Services.AddSingleton<InstructorDetailsPage>();
#if DEBUG
            builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}
