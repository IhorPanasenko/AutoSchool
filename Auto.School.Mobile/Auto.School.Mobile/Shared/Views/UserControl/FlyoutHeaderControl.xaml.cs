namespace Auto.School.Mobile.UserControl;

public partial class FlyoutHeaderControl : ContentView
{
	public FlyoutHeaderControl()
	{
		InitializeComponent();
		if(App.UserInfo is not null)
		{
			lblUserName.Text = App.UserInfo.Name;
			lblUserEmail.Text = App.UserInfo.Surname;
		}
	}
}