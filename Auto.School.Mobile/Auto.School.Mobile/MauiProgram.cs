using Auto.School.Mobile.Views;
using Auto.School.Mobile.ViewModels;
using Microsoft.Extensions.Logging;
using Auto.School.Mobile.Service.Interfaces;
using Auto.School.Mobile.Service.Services;
using Auto.School.Mobile.Shared.Alerts;
using Auto.School.Mobile.Abstract;
using Auto.School.Mobile.Services;

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

            builder.Services.AddSingleton<HomePage>();
            builder.Services.AddSingleton<LoginPage>();
            builder.Services.AddSingleton<RegistrationPage>();
            builder.Services.AddSingleton<ContactPage>();
            builder.Services.AddSingleton<AboutPage>();
            builder.Services.AddSingleton<AllInstructorsPage>();
            builder.Services.AddSingleton<InstructorDetailsPage>();

            builder.Services.AddSingleton<ErrorAlertView>();

            builder.Services.AddSingleton<LoginViewModel>();
            builder.Services.AddSingleton<RegistrationViewModel>();
            builder.Services.AddSingleton<HomeViewModel>();
            builder.Services.AddSingleton<AllInstructorsViewModel>();
            builder.Services.AddSingleton<InstructorDetailsViewModel>();

            builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
            builder.Services.AddTransient<ICityService, CityService>();   
            builder.Services.AddTransient<IInstructorService, InstructorService>();
            builder.Services.AddSingleton<ISharedService, SharedService>();
#if DEBUG
            builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}
