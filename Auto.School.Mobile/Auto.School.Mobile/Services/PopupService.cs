using Auto.School.Mobile.Abstract;
using CommunityToolkit.Maui.Views;

namespace Auto.School.Mobile.Services
{
    public class PopupService : IPopupService
    {
        private readonly IServiceProvider _serviceProvider;

        public PopupService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task ShowPopupAsync<TPopup>() where TPopup : Popup
        {
            var popup = _serviceProvider.GetRequiredService<TPopup>();
            var currentPage = Application.Current.MainPage;
            await currentPage.ShowPopupAsync(popup);
        }

        public void ClosePopup(Popup popup)
        {
            popup.Close();
        }
    }
}
