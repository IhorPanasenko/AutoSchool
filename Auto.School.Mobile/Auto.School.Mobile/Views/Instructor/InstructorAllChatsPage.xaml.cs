using Auto.School.Mobile.Core.Models;
using Auto.School.Mobile.ViewModels.Instructor;
namespace Auto.School.Mobile.Views.Instructor;

public partial class InstructorAllChatsPage : ContentPage
{
    public InstructorAllChatsPage(InstructorAllChatsViewModel instructorAllChatsViewModel)
    {
        InitializeComponent();
        BindingContext = instructorAllChatsViewModel;
    }

    private void CollectionView_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        if (sender is CollectionView collectionView && collectionView.SelectedItem != null)
        {
            collectionView.SelectedItem = null;
            var selectedChatPreview = e.CurrentSelection[0] as ChatPreviewModel;

            if (selectedChatPreview != null)
            {
                if (BindingContext is InstructorAllChatsViewModel viewModel && viewModel.OpenChatCommand != null)
                {
                    viewModel.OpenChatCommand.Execute(selectedChatPreview);
                }
            }
        }
    }
}