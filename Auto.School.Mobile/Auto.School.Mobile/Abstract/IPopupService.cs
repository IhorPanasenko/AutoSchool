using CommunityToolkit.Maui.Views;

namespace Auto.School.Mobile.Abstract
{
    public interface IPopupService
    {
        Task ShowPopupAsync<TPopup>() where TPopup : Popup;
        void ClosePopup(Popup popup);
    }
}
